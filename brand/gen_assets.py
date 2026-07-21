from PIL import Image, ImageDraw, ImageFont
import os

OUT = r"C:\Users\jopso\resuma\apps\web\public"
TEAL = (13, 148, 136, 255)
TEAL_LIGHT = (20, 184, 166, 255)
ORANGE = (251, 146, 60, 255)
WHITE = (255, 255, 255, 255)
SLATE = (15, 23, 42, 255)
S = 512  # master canvas size

def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)

def draw_icon(size=S, bg=TEAL, badge=ORANGE, doc=WHITE, pad_scale=1.0):
    """Draw the Resuma mark (rounded square + document + checkmark badge) at `size`,
    optionally scaled down within the canvas by pad_scale (for maskable safe-zone)."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # background always fills the full canvas (required for maskable icons)
    rounded_rect(d, (0, 0, size, size), radius=int(size * 0.219), fill=bg)

    # inner content drawn on a virtual 512 grid, scaled + centered by pad_scale
    s = size / 512.0 * pad_scale
    off = size * (1 - pad_scale) / 2.0

    def pt(x, y):
        return (off + x * s, off + y * s)

    # document with folded corner
    doc_path = [
        pt(176, 144), pt(176, 128 + 16), pt(180, 128), pt(292, 128),
        pt(296, 128), pt(360, 192), pt(360, 320), pt(360, 400 - 16),
        pt(344, 416), pt(192, 416), pt(176, 400),
    ]
    # simpler: rounded-ish document rectangle with a triangular folded corner cut
    doc_box = [pt(176, 128), pt(360, 128), pt(360, 400), pt(176, 400)]
    d.polygon(doc_box, fill=doc)
    # folded corner (small teal triangle cut from top-right of doc)
    fold = [pt(296, 128), pt(360, 192), pt(296, 192)]
    d.polygon(fold, fill=bg)
    fold_outline = [pt(296, 128), pt(296, 192), pt(360, 192)]
    d.line(fold_outline, fill=bg, width=max(1, int(4 * s)))

    # two faint text lines
    d.rectangle([pt(192, 240)[0], pt(192, 240)[1], pt(320, 252)[0], pt(320, 252)[1]], fill=(*bg[:3], 46))
    d.rectangle([pt(192, 268)[0], pt(192, 268)[1], pt(288, 280)[0], pt(288, 280)[1]], fill=(*bg[:3], 46))

    # checkmark badge
    bcx, bcy, br = pt(336, 344)[0], pt(336, 344)[1], 56 * s
    d.ellipse([bcx - br, bcy - br, bcx + br, bcy + br], fill=badge)
    check_w = max(2, int(12 * s))
    d.line([pt(312, 345), pt(328, 361), pt(360, 328)], fill=WHITE, width=check_w, joint="curve")

    return img

def save_png(img, name, size=None):
    out = img.resize((size, size), Image.LANCZOS) if size and img.size[0] != size else img
    path = os.path.join(OUT, name)
    out.save(path, "PNG")
    print("wrote", path, out.size)

# Standard icon (background fills edge-to-edge; content has natural padding from the doc shape)
master = draw_icon(S, pad_scale=1.0)
save_png(master, "pwa-512x512.png")
save_png(master, "pwa-192x192.png", 192)
save_png(master, "pwa-64x64.png", 64)
save_png(master, "apple-touch-icon-180x180.png", 180)

# Maskable icon: shrink content to ~72% and keep bg full-bleed so OS crop shapes don't clip it
maskable = draw_icon(S, pad_scale=0.72)
save_png(maskable, "maskable-icon-512x512.png")

# favicon.ico - multi-resolution
ico_source = draw_icon(256)
ico_path = os.path.join(OUT, "favicon.ico")
ico_source.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (128, 128)])
print("wrote", ico_path)

# --- OpenGraph banner (1200x630) ---
banner = Image.new("RGB", (1200, 630), SLATE)
bd = ImageDraw.Draw(banner)

# subtle glow behind the icon (cheap approximation of a radial gradient)
glow = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([300, -200, 900, 400], fill=(13, 148, 136, 40))
base = Image.new("RGBA", (1200, 630), (*SLATE[:3], 255))
banner = Image.alpha_composite(base, glow).convert("RGB")
bd = ImageDraw.Draw(banner)

icon_size = 140
icon_img = draw_icon(icon_size, pad_scale=1.0)
icon_x, icon_y = (1200 - icon_size) // 2, 140
banner.paste(icon_img, (icon_x, icon_y), icon_img)

try:
    font_bold = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 72)
    font_reg = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 28)
except Exception as e:
    print("font load failed, using default:", e)
    font_bold = ImageFont.load_default()
    font_reg = ImageFont.load_default()

title = "Resuma"
tw = bd.textlength(title, font=font_bold)
bd.text(((1200 - tw) / 2, icon_y + icon_size + 30), title, font=font_bold, fill=WHITE)

tagline = "A free and open-source resume builder"
tlw = bd.textlength(tagline, font=font_reg)
bd.text(((1200 - tlw) / 2, icon_y + icon_size + 130), tagline, font=font_reg, fill=(148, 163, 184))

banner_path = os.path.join(OUT, "opengraph", "banner.jpg")
banner.save(banner_path, "JPEG", quality=90)
print("wrote", banner_path, banner.size)
