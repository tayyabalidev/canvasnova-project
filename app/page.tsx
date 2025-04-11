'use client'
 
import { useEffect } from 'react'
import { SleekArtworkCustomization } from "@/components/sleek-artwork-customization"
import { Suspense } from "react"
 
export default function Page() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      console.log('Sending height:', height);
      window.parent.postMessage({ type: 'setHeight', height }, '*');
    };
 
    // Initial send
    sendHeight();
 
    // Resize Observer for layout changes
    const resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });
    resizeObserver.observe(document.body);
 
    // Mutation Observer for DOM changes
    const mutationObserver = new MutationObserver(() => {
      sendHeight();
    });
    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
 
    // Window resize
    window.addEventListener('resize', sendHeight);
 
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', sendHeight);
    };
  }, []);
 
  return (
    <Suspense fallback={<div>Lädt...</div>}>
      <SleekArtworkCustomization />
    </Suspense>
  );
}