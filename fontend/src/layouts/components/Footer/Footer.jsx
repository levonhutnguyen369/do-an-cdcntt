"use client"

import React from "react"
import { useAuth } from '@/contexts/AuthContext'

export function Footer() {
	const year = new Date().getFullYear()

  const { user, isAuthenticated } = useAuth();

	return (
		<footer className="border-t border-muted-foreground/10 bg-background">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
					<div className="max-w-sm">
						<a href="/" className="inline-flex items-center space-x-2">
							<div className="h-9 w-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold">
								RM
							</div>
							<span className="font-semibold">React Mekong Trip</span>
						</a>
						<p className="mt-4 text-sm text-muted-foreground">
							Explore curated trips and travel experiences across the Mekong region. Find guides, itineraries, and local tips to plan your next journey.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
						<div>
							<h4 className="mb-3 text-sm font-medium">Product</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a href="/trips" className="hover:text-foreground">Trips</a>
								</li>
								<li>
									<a href="/guides" className="hover:text-foreground">Guides</a>
								</li>
								<li>
									<a href="/pricing" className="hover:text-foreground">Pricing</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="mb-3 text-sm font-medium">Company</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a href="/about" className="hover:text-foreground">About</a>
								</li>
								<li>
									<a href="/careers" className="hover:text-foreground">Careers</a>
								</li>
								<li>
									<a href="/contact" className="hover:text-foreground">Contact</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="mb-3 text-sm font-medium">Support</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a href="/help" className="hover:text-foreground">Help Center</a>
								</li>
								<li>
									<a href="/terms" className="hover:text-foreground">Terms</a>
								</li>
								<li>
									<a href="/privacy" className="hover:text-foreground">Privacy</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-10 border-t border-muted-foreground/10 pt-6 text-sm text-muted-foreground">
					<div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
						<p>© {year} React Mekong Trip. All rights reserved.</p>
						{isAuthenticated && user && (
							<div className="text-sm text-muted-foreground text-right">
								<div className="font-medium">{user.name || user.email}</div>
								<div className="text-xs">{user.email}</div>
							</div>
						)}
						<div className="flex items-center gap-4">
							<a href="/" className="hover:text-foreground">Terms</a>
							<span className="text-muted-foreground">•</span>
							<a href="/" className="hover:text-foreground">Privacy</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer

