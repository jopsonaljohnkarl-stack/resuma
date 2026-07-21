import { Trans } from "@lingui/react/macro";
import { SectionBase } from "../shared/section-base";

export function InformationSectionBuilder() {
	return (
		<SectionBase type="information" className="space-y-4">
			<div className="space-y-2 rounded-md border bg-sky-600 p-5 text-white dark:bg-sky-700">
				<h4 className="font-medium tracking-tight">
					<Trans>About Resuma</Trans>
				</h4>

				<div className="space-y-2 text-xs leading-normal">
					<Trans>
						<p>
							Resuma is a self-hosted resume builder, free to use and built to keep your data private.
						</p>
					</Trans>
				</div>
			</div>
		</SectionBase>
	);
}
