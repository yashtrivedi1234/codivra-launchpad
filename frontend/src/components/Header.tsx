import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
];

export const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	return (
		<>
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.1, ease: "easeOut" }}
				className="w-full fixed top-0 z-50 transition-all duration-500 bg-[#0A0F1C]/95 backdrop-blur-xl border-b-2 border-white/10"
				style={{ willChange: 'transform' }}
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-12">
					<div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
						{/* Logo */}
						<Link to="/" className="relative z-10 flex items-center group">
							<motion.img
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								src={logo}
								alt="Codivra"
								width={160}
								height={64}
								className="h-10 sm:h-12 lg:h-16 w-auto object-contain transition-all duration-300 brightness-0 invert"
								fetchPriority="high"
								decoding="async"
							/>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center gap-1">
							{navLinks.map((link, idx) => {
								const isActive = location.pathname === link.href || 
												 (link.href.startsWith('#') && location.pathname === '/');
								const isExternal = link.href.startsWith('http') || link.href === '/admin';
								
								return isExternal ? (
									<motion.a
										key={link.href}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.05 }}
										whileHover={{ y: -2 }}
										className={`relative px-5 py-3 text-sm font-bold tracking-wider transition-all duration-300 group uppercase ${
											isActive
												? "text-[#00D9FF]"
												: "text-white/70 hover:text-white"
										}`}
										style={{ fontFamily: "'Oswald', sans-serif" }}
									>
										<span className="relative z-10">{link.label}</span>
										{isActive && (
											<motion.div
												layoutId="activeTab"
												className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-xl border border-[#00D9FF]/30"
											/>
										)}
										<span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-full transition-all duration-300 group-hover:w-4/5" />
									</motion.a>
								) : (
									<motion.div
										key={link.href}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.05 }}
									>
										<Link
											to={link.href}
											className={`relative px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 group uppercase block ${
												isActive
													? "text-[#00D9FF]"
													: "text-white/70 hover:text-white"
											}`}
											style={{ fontFamily: "'Oswald', sans-serif" }}
										>
											<span className="relative z-10">{link.label}</span>
											{isActive && (
												<motion.div
													layoutId="activeTab"
													className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-xl border border-[#00D9FF]/30"
													transition={{ type: "spring", stiffness: 300, damping: 30 }}
												/>
											)}
											<span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-full transition-all duration-300 group-hover:w-4/5" />
										</Link>
									</motion.div>
								);
							})}
						</nav>

						{/* CTA Button - Desktop */}
						<motion.div 
							className="hidden lg:flex items-center gap-4"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 }}
						>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button
									asChild
									className="relative overflow-hidden bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.7)] group uppercase tracking-wider text-xs sm:text-sm"
								>
									<Link to="/inquiry" className="flex items-center gap-1 sm:gap-2">
										<Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
										<span className="hidden sm:inline">Inquiry</span>
										<ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
									</Link>
								</Button>
							</motion.div>
						</motion.div>

						{/* Mobile Menu Button */}
						<motion.button
							whileTap={{ scale: 0.9 }}
							className="lg:hidden relative p-3 text-white/70 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/10 border border-white/10"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle menu"
						>
							<AnimatePresence mode="wait">
								{isMobileMenuOpen ? (
									<motion.div
										key="close"
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<X size={24} />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<Menu size={24} />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="lg:hidden fixed inset-0 z-40"
					>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 bg-[#0A0F1C]/98 backdrop-blur-2xl"
							onClick={() => setIsMobileMenuOpen(false)}
						/>
						
						{/* Menu Content */}
						<motion.nav 
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							transition={{ duration: 0.4, type: "spring" }}
							className="relative h-full flex flex-col items-center justify-center px-6"
						>
							<div className="flex flex-col items-center gap-2 w-full max-w-md">
								{navLinks.map((link, index) => {
									const isActive = location.pathname === link.href || 
													 (link.href.startsWith('#') && location.pathname === '/');
									const isExternal = link.href.startsWith('http') || link.href === '/admin';
									
									return isExternal ? (
										<motion.a
											key={link.href}
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											initial={{ opacity: 0, x: -50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.05, type: "spring" }}
											whileTap={{ scale: 0.95 }}
											className={`w-full text-center py-4 sm:py-5 text-2xl sm:text-3xl font-black transition-all duration-300 rounded-xl sm:rounded-2xl uppercase tracking-wide ${
												isActive
													? "text-[#00D9FF] bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border-2 border-[#00D9FF]/30"
													: "text-white/70 hover:text-white hover:bg-white/5"
											}`}
											style={{ fontFamily: "'Oswald', sans-serif" }}
										>
											{link.label}
										</motion.a>
									) : (
										<motion.div
											key={link.href}
											initial={{ opacity: 0, x: -50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.05, type: "spring" }}
											className="w-full"
										>
											<Link
												to={link.href}
												className={`block w-full text-center py-4 sm:py-5 text-2xl sm:text-3xl font-black transition-all duration-300 rounded-xl sm:rounded-2xl uppercase tracking-wide ${
													isActive
														? "text-[#00D9FF] bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border-2 border-[#00D9FF]/30"
														: "text-white/70 hover:text-white hover:bg-white/5"
												}`}
												onClick={() => setIsMobileMenuOpen(false)}
												style={{ fontFamily: "'Oswald', sans-serif" }}
											>
												{link.label}
											</Link>
										</motion.div>
									);
								})}
							</div>
							
							{/* Mobile CTA */}
							<motion.div 
								className="mt-12 w-full max-w-md"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<Button
									asChild
									className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black py-6 sm:py-7 md:py-8 text-lg sm:text-xl rounded-xl sm:rounded-2xl hover:shadow-[0_0_40px_rgba(0,217,255,0.7)] uppercase tracking-wider"
								>
									<Link 
										to="/inquiry" 
										onClick={() => setIsMobileMenuOpen(false)}
										className="flex items-center justify-center gap-3"
									>
										<Rocket className="w-6 h-6" />
										Inquiry
										<Zap className="w-6 h-6" />
									</Link>
								</Button>
							</motion.div>
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};