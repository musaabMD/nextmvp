"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from "@/libs/supabase/client";
import { usePathname } from "next/navigation";
import { Crisp } from "crisp-sdk-web";
import NextTopLoader from "nextjs-toploader";
import { Toaster, toast } from "react-hot-toast";
import Tooltip from "react-tooltip";
import config from "@/config";
import Header from '@/components/Header';

// Crisp customer chat support:
const CrispChat = () => {
  const pathname = usePathname();
  const supabase = createClient();
  const [data, setData] = useState(null);

  // This is used to get the user data from Supabase Auth (if logged in)
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setData({ user });
      }
    };
    getUser();
  }, []);

  // Set up and manage Crisp chat visibility
  useEffect(() => {
    if (config?.crisp?.id) {
      Crisp.configure(config.crisp.id);
      if (config.crisp.onlyShowOnRoutes && !config.crisp.onlyShowOnRoutes.includes(pathname)) {
        Crisp.chat.hide();
        Crisp.chat.onChatClosed(() => Crisp.chat.hide());
      }
    }
  }, [pathname]);

  // Add User Unique ID to Crisp to easily identify users when reaching support (optional)
  useEffect(() => {
    if (data?.user && config?.crisp?.id) {
      Crisp.session.setData({ userId: data.user?.id });
    }
  }, [data]);

  return null;
};

const ClientLayout = ({ children }) => {
  return (
    <>
      <Header />
      {/* Show a progress bar at the top when navigating between pages */}
      <NextTopLoader color={config.colors.main} showSpinner={false} />

      {/* Render children components passed to this layout */}
      {children}

      {/* Show Success/Error messages anywhere from the app with toast() */}
      <Toaster
        toastOptions={{
          duration: 3000,
          position: 'top-right'
        }}
      />

      {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
      <Tooltip id="tooltip" className="z-[60] !opacity-100 max-w-sm shadow-lg" />

      {/* Set Crisp customer chat support */}
      <CrispChat />
    </>
  );
};

export default ClientLayout;
