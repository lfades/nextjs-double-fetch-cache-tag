import { type ReactNode } from "react";

type Props = Readonly<{ children: ReactNode }>;

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body style={{ margin: 2 }}>
				<div style={{ backgroundColor: "skyblue", padding: 16 }}>Header</div>
				{children}
				<div style={{ backgroundColor: "skyblue", padding: 16 }}>Footer</div>
			</body>
		</html>
	);
}
