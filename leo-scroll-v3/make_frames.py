# usage: python3 make_frames.py [image=source.jpg] [N=9] [vx=.58] [vy=.60]
# -> frames/f_0001.webp ... seamless infinite-zoom loop (vx,vy = vanishing point as fraction of the image)
import sys, math, numpy as np
from PIL import Image, ImageFilter
a = sys.argv[1:] + [None] * 4
src = Image.open(a[0] or 'source.jpg').convert('RGB')
N = int(a[1] or 9); vxf = float(a[2] or .58); vyf = float(a[3] or .60)
W, H, R = 2560, 1440, 3.0           # frame size, total zoom ratio of one loop (keep in sync with scrub.js)
sw, sh = src.size
f0 = max(W / sw, H / sh) * .6; vx, vy = vxf * sw, vyf * sh; cx, cy = W / 2, H / 2
yy, xx = np.mgrid[0:sh, 0:sw]
d = np.minimum.reduce([xx / sw, 1 - xx / sw, yy / sh, 1 - yy / sh])
al0 = np.clip(d / .14, 0, 1); al0 = al0 * al0 * (3 - 2 * al0)          # feathered edges
rgba = src.copy(); rgba.putalpha(Image.fromarray((al0 * 255).astype('uint8')))
k = max(W / sw, H / sh)
bg = src.resize((int(sw * k) + 1, int(sh * k) + 1), Image.LANCZOS)
bx, by = (bg.width - W) // 2, (bg.height - H) // 2
bg = np.asarray(bg.crop((bx, by, bx + W, by + H)).filter(ImageFilter.GaussianBlur(34)), float) * .5
X, Y = np.meshgrid(np.linspace(-1, 1, W), np.linspace(-1, 1, H))
vig = (1 - .3 * np.clip(X ** 2 * .6 + Y ** 2, 0, 1.4))[..., None]
rng = np.random.default_rng(7)
for i in range(N):
    out = bg.copy()
    for u in sorted([((i / N + j / 3) % 1) for j in range(3)], key=lambda u: -u):
        g = f0 * R ** u
        L = rgba.transform((W, H), Image.AFFINE, (1 / g, 0, vx - cx / g, 0, 1 / g, vy - cy / g), Image.BICUBIC)
        L = np.asarray(L, float); al = (L[..., 3] / 255 * math.sin(math.pi * u) ** .8)[..., None]
        out = out * (1 - al) + L[..., :3] * al
    out = out * vig + rng.normal(0, 2.5, (H, W, 1))
    Image.fromarray(np.clip(out, 0, 255).astype('uint8')).save(f'frames/f_{i + 1:04d}.webp', quality=86)
    print('frame', i + 1, flush=True)
