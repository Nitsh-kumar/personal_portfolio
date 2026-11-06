# Nitish Kumar — Personal Portfolio

A Next.js portfolio for presenting my engineering background, selected projects, and contact links.

## Implemented interface

- Single-page navigation, career and skills sections, and project cards.
- Three.js hero artwork with supporting visual assets.
- A local FAQ widget that selects predefined answers by keyword.
- A contact form that opens an email draft in the visitor's mail client.

The FAQ widget does not call an LLM or retrieve external documents. Its typing delay is a display effect. The contact form does not send email or confirm delivery.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Three.js, and Lucide React, as declared in [package.json](package.json).

## Local setup

Use a Node.js release compatible with the pinned Next.js version and the included npm lockfile.

```bash
git clone https://github.com/Nitsh-kumar/personal_portfolio.git
cd personal_portfolio
npm ci
npm run dev
```

Open the URL printed by Next.js, normally `http://localhost:3000`.

```bash
npm run lint
npm run build
npm run start
```

`start` serves an existing production build.

## Source map

- [src/app/page.tsx](src/app/page.tsx): page composition.
- [src/app/components](src/app/components): portfolio sections.
- [src/app/components/AIAssistant.tsx](src/app/components/AIAssistant.tsx): predefined FAQ replies.
- [src/app/components/Contact.tsx](src/app/components/Contact.tsx): mailto draft generation.
- [src/app/layout.tsx](src/app/layout.tsx): metadata and fonts.
- [public](public): images, branding, and the downloadable resume.
- [DESIGN.md](DESIGN.md): visual design specification.

## Content accuracy

Project links and interface text need to track the actual project status. GPTCraft is a personal chat application; the employer's CRAFT SAP migration work is separate. MCP integration, model availability, deployment status, and latency must not be inferred from decorative diagrams or project cards.

Review the published resume, contact details, metadata domain, and FAQ statements before sharing the site. The current metadata points to a GPTCraft domain whose ownership and deployment role need confirmation.

No LICENSE file is present in the reviewed tree; the previous MIT claim should not be treated as a license grant. See [project status](docs/PROJECT_STATUS.md).

## Validation

This documentation was checked against repository files on 13 October 2026. Builds, application runs, and test suites were not executed during this documentation pass. Commands below describe the intended local workflow, not a verified deployment.
