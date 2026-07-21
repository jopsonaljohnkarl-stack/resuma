import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { BrandIcon } from "./brand-icon";

beforeAll(() => {
	vi.stubGlobal("__APP_VERSION__", "9.9.9");
});

describe("BrandIcon", () => {
	it("renders two img elements (light + dark variants)", () => {
		render(<BrandIcon />);
		const imgs = screen.getAllByAltText("Resuma");
		expect(imgs).toHaveLength(2);
	});

	it("uses 'logo' as default variant", () => {
		render(<BrandIcon />);
		const imgs = screen.getAllByAltText("Resuma");
		expect(imgs.some((img) => img.getAttribute("src") === "/logo/dark.svg?v=9.9.9")).toBe(true);
		expect(imgs.some((img) => img.getAttribute("src") === "/logo/light.svg?v=9.9.9")).toBe(true);
	});

	it("uses 'icon' variant when specified", () => {
		render(<BrandIcon variant="icon" />);
		const imgs = screen.getAllByAltText("Resuma");
		expect(imgs.some((img) => img.getAttribute("src") === "/icon/dark.svg?v=9.9.9")).toBe(true);
		expect(imgs.some((img) => img.getAttribute("src") === "/icon/light.svg?v=9.9.9")).toBe(true);
	});

	it("merges custom className on both imgs", () => {
		render(<BrandIcon className="my-custom" />);
		const imgs = screen.getAllByAltText("Resuma");
		for (const img of imgs) {
			expect(img).toHaveClass("my-custom");
		}
	});

	it("hides dark variant by default (light mode); dark mode reveals it via dark:block", () => {
		render(<BrandIcon />);
		const imgs = screen.getAllByAltText("Resuma");
		const darkImg = imgs.find((img) => img.getAttribute("src") === "/logo/dark.svg?v=9.9.9");
		expect(darkImg).toHaveClass("hidden");
		expect(darkImg).toHaveClass("dark:block");
	});
});
