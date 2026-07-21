import { t } from "@lingui/core/macro";
import { ArrowRightIcon, ArrowSquareOutIcon, CopyIcon, EnvelopeIcon, TranslateIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { BrandIcon } from "@reactive-resume/ui/components/brand-icon";
import { Button } from "@reactive-resume/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@reactive-resume/ui/components/dropdown-menu";
import { LocaleCombobox } from "@/features/locale/combobox";
import { ThemeToggleButton } from "@/features/theme/toggle-button";

const CONTACT_EMAIL = "jopsonaljohnkarl@gmail.com";
const CONTACT_SUBJECT = "Project inquiry via Resuma";
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`;
const GMAIL_COMPOSE_HREF = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(CONTACT_SUBJECT)}`;

export function Header() {
	const y = useMotionValue(0);
	const lastScroll = useRef(0);
	const ticking = useRef(false);
	const springY = useSpring(y, { stiffness: 300, damping: 40 });

	const handleCopyEmail = async () => {
		await navigator.clipboard.writeText(CONTACT_EMAIL);
		toast.success("Email address copied to clipboard.");
	};

	useEffect(() => {
		if (typeof window === "undefined") return;

		function onScroll() {
			const current = window.scrollY ?? 0;
			if (!ticking.current) {
				window.requestAnimationFrame(() => {
					if (current > 32 && current > lastScroll.current) {
						// Scrolling down, hide
						y.set(-100);
					} else {
						// Scrolling up, show
						y.set(0);
					}
					lastScroll.current = current;
					ticking.current = false;
				});
				ticking.current = true;
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [y]);

	return (
		<m.header
			style={{ y: springY }}
			className="fixed inset-x-0 top-0 z-50 border-transparent border-b bg-background/80 backdrop-blur-lg transition-colors"
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.35, ease: "easeOut" }}
		>
			<nav aria-label={t`Main navigation`} className="container mx-auto flex items-center gap-x-4 p-3 lg:px-12">
				<Link to="/" className="transition-opacity hover:opacity-80" aria-label={t`Resuma - Go to homepage`}>
					<BrandIcon className="size-10" />
				</Link>

				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<button
								type="button"
								className="mx-auto hidden items-center gap-x-2 rounded-full border border-border bg-secondary/30 px-4 py-1.5 text-muted-foreground text-xs transition-colors hover:border-primary/40 hover:text-foreground md:flex"
							>
								<span>
									Built by <span className="font-medium text-foreground">John Jopson</span> · Custom software, AI
									solutions &amp; web development
								</span>
								<span className="font-medium text-primary">Get in touch →</span>
							</button>
						}
					/>

					<DropdownMenuContent align="center" side="bottom">
						<DropdownMenuItem
							render={
								<a href={MAILTO_HREF}>
									<EnvelopeIcon />
									Email app
								</a>
							}
						/>
						<DropdownMenuItem
							render={
								<a href={GMAIL_COMPOSE_HREF} target="_blank" rel="noreferrer">
									<ArrowSquareOutIcon />
									Open in Gmail
								</a>
							}
						/>
						<DropdownMenuItem onClick={handleCopyEmail}>
							<CopyIcon />
							Copy email address
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<div className="ml-auto flex items-center gap-x-2">
					<LocaleCombobox
						render={
							<Button size="icon" variant="ghost" aria-label={t`Change language`}>
								<TranslateIcon />
							</Button>
						}
					/>

					<ThemeToggleButton />

					<div className="hidden items-center gap-x-4 sm:flex">
						<Button
							size="icon"
							nativeButton={false}
							aria-label={t`Go to dashboard`}
							render={
								<Link to="/dashboard">
									<ArrowRightIcon aria-hidden="true" />
								</Link>
							}
						/>
					</div>
				</div>
			</nav>
		</m.header>
	);
}
