/**
 * MOTA Terms addon — prompts for service name, support email, and ToS/Privacy content.
 * Returns { serviceName, supportEmail, lastUpdated, tosContent, privacyContent } for Hygen.
 */

const DEFAULT_TOS_HTML = `<div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
	<div class="overflow-hidden">
		<div class="px-4 py-5 sm:p-6">
			<h1 class="text-3xl font-bold mb-8 text-center">Terms of Service</h1>

			<div class="max-w-none">
				<ol class="list-decimal pl-5">
					<li class="mb-6">
						<h2 class="text-xl font-bold">Introduction & Acceptance</h2>
						<p>
							These Terms govern your access to and use of the services, websites, and software
							provided by <strong>[SERVICE]</strong> (the "Service"). By using the Service,
							you agree to these Terms.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Eligibility & Accounts</h2>
						<p>
							You must be able to form a legally binding contract in your jurisdiction. If you
							create an account, you're responsible for all activity under it and for keeping your
							credentials secure and accurate.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Permitted Use</h2>
						<p>
							Use the Service only for lawful purposes and in accordance with these Terms and any
							applicable policies or guidelines we publish.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Prohibited Conduct</h2>
						<p>Do not, for example:</p>
						<ul class="list-disc pl-5">
							<li>Violate any law, third-party right, or contract</li>
							<li>Infringe intellectual property or privacy rights</li>
							<li>Access or use non-public areas or systems without authorization</li>
							<li>Interfere with or disrupt the Service or its security</li>
							<li>Upload malware, spam, or harmful content</li>
							<li>Reverse engineer or attempt to circumvent technical measures where prohibited</li>
						</ul>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Your Content & Our IP</h2>
						<p>
							You retain rights to content you submit and grant us a non-exclusive license to host,
							store, and display it to operate the Service. The Service, including trademarks and
							software, is owned by <strong>[SERVICE]</strong> or its licensors and protected
							by law.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Privacy</h2>
						<p>
							Your use of the Service is also subject to our Privacy Notice. Please review it to
							understand how we collect and use information.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Third-Party Services</h2>
						<p>
							The Service may link to or integrate third-party products or services. We are not
							responsible for those third parties, and your use of them may be governed by their
							terms and privacy policies.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Fees & Purchases (If Applicable)</h2>
						<p>
							You agree to pay any applicable fees, taxes, and charges. Except where required by
							law, payments may be non-refundable.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Disclaimers</h2>
						<p>
							The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind,
							to the fullest extent permitted by law.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Limitation of Liability</h2>
						<p>
							To the maximum extent permitted by law, <strong>[SERVICE]</strong> will not be
							liable for any indirect, incidental, special, consequential, or punitive damages, or
							any loss of profits or data, arising from or related to your use of the Service.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Indemnification</h2>
						<p>
							You agree to defend, indemnify, and hold harmless <strong>[SERVICE]</strong>
							from claims, damages, liabilities, and costs arising from your use of the Service or
							your violation of these Terms.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Termination</h2>
						<p>
							We may suspend or terminate the Service or your access at any time where permitted by
							law. You may stop using the Service at any time. Certain provisions survive
							termination (e.g., IP, disclaimers, limitations of liability).
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Changes to These Terms</h2>
						<p>
							We may update these Terms from time to time. The "Last Updated" date will be revised,
							and continued use of the Service constitutes acceptance of the changes.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Contact</h2>
						<p>
							Questions? Contact us at
							<a href="mailto:[EMAIL]">[EMAIL]</a>.
						</p>
					</li>
				</ol>

				<p class="text-sm mt-8 text-right">
					Last Updated: <span>[DATE]</span>
				</p>
			</div>
		</div>
	</div>
</div>`;

const DEFAULT_PRIVACY_HTML = `<div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
	<div class="overflow-hidden">
		<div class="px-4 py-5 sm:p-6">
			<h1 class="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

			<div class="max-w-none">
				<ol class="list-decimal pl-5">
					<li class="mb-6">
						<h2 class="text-xl font-bold">Introduction</h2>
						<p>
							This Privacy Policy explains how <strong>[SERVICE]</strong> ("we," "us," or
							"our") collects, uses, discloses, and protects information when you access or use
							our services, websites, and software (the "Service").
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Information We Collect</h2>
						<p>We may collect the following categories of information:</p>
						<ul class="list-disc pl-5">
							<li>
								<strong>Information you provide directly</strong>, such as your name, email
								address, billing details, account credentials, and any content you submit.
							</li>
							<li>
								<strong>Usage information</strong>, such as pages viewed, features used,
								interactions with the Service, and approximate location derived from IP address.
							</li>
							<li>
								<strong>Device and technical information</strong>, such as browser type, device
								identifiers, operating system, log data, and referring URLs.
							</li>
							<li>
								<strong>Cookies and similar technologies</strong>, which may collect information
								about browsing behavior and preferences.
							</li>
						</ul>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">How We Use Information</h2>
						<p>We may use your information to:</p>
						<ul class="list-disc pl-5">
							<li>Provide, operate, maintain, and improve the Service</li>
							<li>Create and manage user accounts</li>
							<li>Process transactions and send related notices</li>
							<li>Respond to questions, support requests, and communications</li>
							<li>Monitor usage, analyze trends, and improve functionality</li>
							<li>Protect the security and integrity of the Service</li>
							<li>Comply with legal obligations and enforce our terms and policies</li>
						</ul>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Legal Bases for Processing (If Applicable)</h2>
						<p>
							Where required by applicable law, we process personal data based on legal grounds
							such as your consent, performance of a contract, compliance with legal obligations,
							and our legitimate interests in operating and improving the Service.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Cookies & Similar Technologies</h2>
						<p>
							We may use cookies, local storage, pixels, and similar technologies to remember user
							preferences, keep you signed in, analyze traffic, and improve the Service. You may be
							able to control cookies through your browser settings, though some features may not
							function properly if disabled.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">How We Share Information</h2>
						<p>We may share information in the following circumstances:</p>
						<ul class="list-disc pl-5">
							<li>With vendors, contractors, and service providers who support our operations</li>
							<li>With payment processors and other business partners as needed to provide the Service</li>
							<li>When required by law, regulation, legal process, or governmental request</li>
							<li>
								To protect rights, safety, security, and property of <strong>[SERVICE]</strong>,
								our users, or others
							</li>
							<li>
								In connection with a merger, acquisition, financing, reorganization, or sale of all
								or part of our business
							</li>
							<li>With your consent or at your direction</li>
						</ul>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Data Retention</h2>
						<p>
							We retain personal information for as long as reasonably necessary to provide the
							Service, fulfill the purposes described in this Privacy Policy, comply with legal
							obligations, resolve disputes, and enforce our agreements.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Data Security</h2>
						<p>
							We use reasonable administrative, technical, and organizational measures to help
							protect personal information. However, no method of transmission over the internet or
							method of storage is completely secure, and we cannot guarantee absolute security.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">International Data Transfers</h2>
						<p>
							Your information may be transferred to, stored in, or processed in countries other
							than your own. Where required by law, we take appropriate steps to provide adequate
							protection for such transfers.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Your Privacy Rights</h2>
						<p>
							Depending on your location, you may have rights regarding your personal information,
							such as the right to access, correct, delete, restrict, object to certain processing,
							or request portability of your data. You may also have the right to withdraw consent
							where processing is based on consent.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Children's Privacy</h2>
						<p>
							The Service is not directed to children, and we do not knowingly collect personal
							information from them. If you believe a child has provided us with personal
							information, please contact us so we can take appropriate action.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Third-Party Services</h2>
						<p>
							The Service may contain links to or integrations with third-party websites, products,
							or services. We are not responsible for the privacy practices of those third parties,
							and we encourage you to review their policies.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Changes to This Privacy Policy</h2>
						<p>
							We may update this Privacy Policy from time to time. The "Last Updated" date will be
							revised, and changes will become effective when posted unless otherwise required by law.
						</p>
					</li>

					<li class="mb-6">
						<h2 class="text-xl font-bold">Contact</h2>
						<p>
							If you have questions or requests regarding this Privacy Policy, contact us at
							<a href="mailto:[EMAIL]">[EMAIL]</a>.
						</p>
					</li>
				</ol>

				<p class="text-sm mt-8 text-right">
					Last Updated: <span>[DATE]</span>
				</p>
			</div>
		</div>
	</div>
</div>`;

const PLACEHOLDER_SERVICE = '[SERVICE]';
const PLACEHOLDER_EMAIL = '[EMAIL]';

function applyPlaceholders(html, serviceName, supportEmail, lastUpdated) {
	const s = (serviceName && String(serviceName).trim() && String(serviceName).trim() !== PLACEHOLDER_SERVICE)
		? String(serviceName).trim() : PLACEHOLDER_SERVICE;
	const e = (supportEmail && String(supportEmail).trim() && String(supportEmail).trim() !== PLACEHOLDER_EMAIL)
		? String(supportEmail).trim() : PLACEHOLDER_EMAIL;
	const d = (lastUpdated && String(lastUpdated).trim())
		? String(lastUpdated).trim() : new Date().toISOString().slice(0, 10);
	return html
		.replace(/\[SERVICE\]/g, s)
		.replace(/\[EMAIL\]/g, e)
		.replace(/\[DATE\]/g, d);
}

function getDefaultToS(serviceName, supportEmail, lastUpdated) {
	return applyPlaceholders(DEFAULT_TOS_HTML, serviceName, supportEmail, lastUpdated);
}

function getDefaultPrivacy(serviceName, supportEmail, lastUpdated) {
	return applyPlaceholders(DEFAULT_PRIVACY_HTML, serviceName, supportEmail, lastUpdated);
}

async function askText(prompts, { message, initial }) {
	const res = await prompts({ type: 'text', name: 'v', message, initial });
	return res?.v;
}

async function askSelect(prompts, { message, choices }) {
	const res = await prompts({ type: 'select', name: 'v', message, choices });
	return res?.v;
}

async function runPrompts({ prompts }) {
	const today = new Date().toISOString().slice(0, 10);
	const serviceName = await askText(prompts, {
		message: 'Your service name (placeholder in documents: [SERVICE]; leave as-is to keep placeholder)',
		initial: PLACEHOLDER_SERVICE
	});
	if (serviceName === undefined) process.exit(1);

	const supportEmail = await askText(prompts, {
		message: 'Support email address (placeholder in documents: [EMAIL]; leave as-is to keep placeholder)',
		initial: PLACEHOLDER_EMAIL
	});
	if (supportEmail === undefined) process.exit(1);

	const lastUpdated = await askText(prompts, {
		message: 'Last Updated date (placeholder: [DATE]; use YYYY-MM-DD or leave blank for today)',
		initial: today
	});
	if (lastUpdated === undefined) process.exit(1);

	const tosChoice = await askSelect(prompts, {
		message: 'Terms of Service content',
		choices: [
			{ title: 'Use default template', value: 'template' },
			{ title: 'Paste your own (multiline)', value: 'paste' }
		]
	});
	if (tosChoice === undefined) process.exit(1);

	const resolvedDate = (lastUpdated && String(lastUpdated).trim()) ? String(lastUpdated).trim() : today;
	let tosContent;
	if (tosChoice === 'template') {
		tosContent = getDefaultToS(serviceName, supportEmail, lastUpdated);
	} else {
		const pasted = await askText(prompts, {
			message: 'Paste your ToS HTML content (then press Enter)',
			initial: ''
		});
		const raw = pasted != null ? pasted : getDefaultToS(serviceName, supportEmail, lastUpdated);
		tosContent = applyPlaceholders(raw, serviceName, supportEmail, resolvedDate);
	}

	const privacyChoice = await askSelect(prompts, {
		message: 'Privacy Policy content',
		choices: [
			{ title: 'Use default template', value: 'template' },
			{ title: 'Paste your own (multiline)', value: 'paste' }
		]
	});
	if (privacyChoice === undefined) process.exit(1);

	let privacyContent;
	if (privacyChoice === 'template') {
		privacyContent = getDefaultPrivacy(serviceName, supportEmail, lastUpdated);
	} else {
		const pasted = await askText(prompts, {
			message: 'Paste your Privacy Policy HTML content (then press Enter)',
			initial: ''
		});
		const raw = pasted != null ? pasted : getDefaultPrivacy(serviceName, supportEmail, lastUpdated);
		privacyContent = applyPlaceholders(raw, serviceName, supportEmail, resolvedDate);
	}

	// Escape EJS so user-pasted content with <% does not run as template code
	const escapeEjs = (s) => String(s).replace(/<%/g, '<%%');

	return {
		serviceName: (serviceName && String(serviceName).trim() && String(serviceName).trim() !== PLACEHOLDER_SERVICE) ? String(serviceName).trim() : PLACEHOLDER_SERVICE,
		supportEmail: (supportEmail && String(supportEmail).trim() && String(supportEmail).trim() !== PLACEHOLDER_EMAIL) ? String(supportEmail).trim() : PLACEHOLDER_EMAIL,
		lastUpdated: (lastUpdated && String(lastUpdated).trim()) ? String(lastUpdated).trim() : today,
		tosContent: escapeEjs(tosContent),
		privacyContent: escapeEjs(privacyContent)
	};
}

// Hygen: if hooksModule.params exists, it returns that and never calls .filter.
// Addon already passed args via CLI; we return args so Hygen uses them and does not prompt again.
runPrompts.params = ({ args }) => args;
export default runPrompts;
