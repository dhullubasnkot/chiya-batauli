import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-4 text-center md:text-left">
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/chiya.png"
            alt="Chiya Khasauli Logo"
            width={80}
            height={80}
            className="rounded-full mb-5 border border-amber-500 shadow-md"
            priority
          />
          <p className="text-sm text-gray-400 max-w-xs md:max-w-[240px] leading-relaxed">
            A perfect place for your morning and evening gatherings. Come share
            your stories at Chiya Khasauli over a warm cup of tea.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-amber-500 mb-5 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {[
              { href: "/", label: "Home" },
              { href: "/menu", label: "Menu" },
              { href: "/gallery", label: "Gallery" },
              { href: "/guffgaff", label: "Guff Gaff" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-amber-500 transition duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-amber-500 mb-5 uppercase tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaPhoneAlt className="text-amber-500" />
              +977-9800000000
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaEnvelope className="text-amber-500" />
              chiya@example.com
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-amber-500 mt-1" />
              <span>Khasauli, Rupandehi, Nepal</span>
            </li>
          </ul>

          <div className="flex gap-6 mt-6 justify-center md:justify-start text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-amber-500 transition duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-amber-500 transition duration-200"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="w-full rounded-xl overflow-hidden border border-gray-700 shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8951.642478815153!2d83.46054086406865!3d27.689668781029138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996867b77c6d20b%3A0x825dcd306f66d912!2z4KSm4KWH4KS14KWA4KSo4KSX4KSwIOCkmuCljOCkpOCkvuCksOClgA!5e1!3m2!1sne!2snp!4v1747893052449!5m2!1sne!2snp"
            width="100%"
            height="100%"
            className="aspect-[4/3] md:aspect-auto"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-800 pt-5">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-amber-500 font-medium">Chiya Khasauli</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
