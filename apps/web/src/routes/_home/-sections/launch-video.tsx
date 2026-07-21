export function LaunchVideo() {
	return (
		<section id="launch-video" aria-labelledby="launch-video-heading">
			<div className="flex flex-col items-center gap-y-8 px-6 py-16 sm:px-10 lg:px-16">
				<div className="text-center">
					<h2 id="launch-video-heading" className="font-bold text-3xl tracking-tight md:text-4xl">
						See it in action
					</h2>
					<p className="mt-3 text-base text-muted-foreground">
						The whole job hunt, from building your resume to applying with AI, in under two minutes.
					</p>
				</div>

				<video
					controls
					preload="none"
					poster="/opengraph/banner.jpg"
					src="/videos/launch.mp4"
					className="w-full max-w-4xl rounded-lg border"
				>
					<track kind="captions" />
				</video>
			</div>
		</section>
	);
}
