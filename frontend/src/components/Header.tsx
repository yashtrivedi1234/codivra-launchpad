import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
	{ href: "/services", label: "Services" },
	{ href: "/about", label: "About" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/blog", label: "Blog" },
	{ href: "/careers", label: "Careers" },
	{ href: "/contact", label: "Contact" },
	{ href: "/admin", label: "Admin", external: true },
];

export const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	return (
		<>
			<header
				className="w-full fixed top-0 z-50 transition-all duration-500 bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-white/5"
			>
				<div className="container mx-auto px-6 lg:px-12">
					<div className="flex items-center justify-between h-20 lg:h-24">
						{/* Logo */}
						<Link to="/" className="relative z-10 flex items-center group">
							<img
								src={logo}
								alt="Codivra"
								className="h-12 lg:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 invert"
							/>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center gap-1">
							{navLinks.map((link) =>
								link.external ? (
									<a
										key={link.href}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className={`relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 group ${
											location.pathname === link.href
												? "text-[#00D9FF]"
												: "text-white/70 hover:text-white"
										}`}
									>
										<span className="relative z-10">{link.label}</span>
										<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#00D9FF] to-[#0066FF] transition-all duration-300 group-hover:w-3/4" />
									</a>
								) : (
								<Link
									key={link.href}
									to={link.href}
									className={`relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 group ${
										location.pathname === link.href
											? "text-[#00D9FF]"
											: "text-white/70 hover:text-white"
									}`}
								>
									<span className="relative z-10">{link.label}</span>
									{location.pathname === link.href && (
										<span className="absolute inset-0 bg-white/5 rounded-lg" />
									)}
									<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#00D9FF] to-[#0066FF] transition-all duration-300 group-hover:w-3/4" />
								</Link>
								)
							)}
						</nav>

						{/* CTA Button - Desktop */}
						<div className="hidden lg:flex items-center gap-4">
							<Button
								asChild
								className="relative overflow-hidden bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:scale-105 group"
							>
								<Link to="/contact" className="flex items-center gap-2">
									Start Project
									<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</Link>
							</Button>
						</div>

						{/* Mobile Menu Button */}
						<button
							className="lg:hidden p-2.5 text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			<div
				className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
					isMobileMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
			>
				<div
					className="absolute inset-0 bg-[#0A0F1C]/98 backdrop-blur-2xl"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
				<nav className="relative h-full flex flex-col items-center justify-center px-6">
					{navLinks.map((link, index) =>
						link.external ? (
							<a
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`w-full max-w-xs text-center py-4 text-2xl font-bold transition-all duration-300 ${
									location.pathname === link.href
										? "text-[#00D9FF]"
										: "text-white/70 hover:text-white"
								}`}
							>
								{link.label}
							</a>
						) : (
						<Link
							key={link.href}
							to={link.href}
							className={`w-full max-w-xs text-center py-4 text-2xl font-bold transition-all duration-300 ${
								location.pathname === link.href
									? "text-[#00D9FF]"
									: "text-white/70 hover:text-white"
							}`}
							onClick={() => setIsMobileMenuOpen(false)}
							style={{
								animationDelay: `${index * 50}ms`,
								animation: isMobileMenuOpen
									? "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
									: "none",
								opacity: 0,
							}}
						>
							{link.label}
						</Link>
						)
					)}
					<div className="mt-8 w-full max-w-xs">
						<Button
							asChild
							className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-semibold py-6 text-lg rounded-lg"
						>
							<Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
								Start Project
							</Link>
						</Button>
					</div>
				</nav>
			</div>

			<style>{`
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</>
	);
};