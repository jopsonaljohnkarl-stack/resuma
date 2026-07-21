import { Trans } from "@lingui/react/macro";
import { m } from "motion/react";
import { BrandIcon } from "@reactive-resume/ui/components/brand-icon";
import { Copyright } from "@/components/ui/copyright";

export function Footer() {
	return (
		<m.footer
			id="footer"
			className="p-4 pb-8 will-change-[opacity] md:p-8 md:pb-12"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.45 }}
		>
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
				{/* Brand Column */}
				<div className="space-y-4">
					<BrandIcon variant="logo" className="size-10" />

					<div className="space-y-2">
						<h2 className="font-semibold text-lg tracking-tight">Resuma</h2>
						<p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
							<Trans>A resume builder for me and my friends — free, private, and always in your control.</Trans>
						</p>
					</div>
				</div>

				{/* Copyright Column */}
				<div className="space-y-4">
					<Copyright />
				</div>
			</div>
		</m.footer>
	);
}
