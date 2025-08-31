import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-900 text-center text-zinc-50 ">
      <div className="container mx-auto px-8">
        <p className="text-sm">
          © {new Date().getFullYear()} All rights reserved | Powered by{' '}
          {process.env.NEXT_PUBLIC_POWERED_BY}
        </p>

        <p className="text-sm">
          support:{' '}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
            className="font-semibold text-blue-600 hover:underline"
          >
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
