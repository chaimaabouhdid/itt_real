import Link from "next/link";

import {
    FaLinkedinIn,
    FaInstagram,
    FaFacebook,
    FaTwitter,
} from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="flex flex-col justify-between py-10 w-full gap-16 items-center border p-3 h-full bg-slate-50
         text-slate-900">
            <h1 className="text-4xl font-bold text-emerald-600">IT Torch</h1>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <Link href="/">Dashboard</Link>
                <Link href="/search">Browse</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/contact-us">Contact Us</Link>
                <Link href="/terms-of-service">Terms Of Use</Link>
            </div>

            <div className="flex gap-4">
                <Link href="https://www.linkedin.com/signup?trk=guest_homepage-basic_nav-header-join">
                    <FaLinkedinIn size={20} />
                </Link>
                <Link href="https://twitter.com/">
                    <FaTwitter size={20} />
                </Link>
                <Link href="https://www.facebook.com/">
                    <FaFacebook size={20} />
                </Link>
                <Link href="https://www.instagram.com/">
                    <FaInstagram size={20} />
                </Link>
            </div>

            <p className="text-sm">
                Copyright © 2024 It Torch. All Rights Reserved.
            </p>
        </footer>
    );
}