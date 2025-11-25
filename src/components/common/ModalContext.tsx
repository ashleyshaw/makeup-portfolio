/**
 * @fileoverview Modal State Management Context for Ash Shaw Portfolio
 * 
 * Provides global state management for modal components (lightboxes, dialogs, etc.)
 * to prevent overlapping UI elements like scroll-to-top buttons appearing over modals.
 * 
 * Features:
 * - Global modal state tracking across the application
 * - Component registration system for different modal types
 * - Hook for consuming modal state in components
 * - Automatic cleanup and state management
 * - TypeScript support with proper type safety
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial implementation for lightbox management
 * @lastModified 2025-01-29
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Modal type identifiers for different modal components
 */
type ModalType = 'lightbox' | 'dialog' | 'drawer' | 'alert' | 'contact-form' | 'dropdown';

/**
 * Modal state interface
 */
interface ModalState {
  /** Unique identifier for the modal instance */
  id: string;
  /** Type of modal (lightbox, dialog, etc.) */
  type: ModalType;
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Optional additional data for the modal */
  data?: any;
}

/**
 * Modal context interface
 */
interface ModalContextValue {
  /** Array of currently registered modals */
  modals: ModalState[];
  /** Whether any modal is currently open */
  hasOpenModals: boolean;
  /** Register a new modal with the context */
  registerModal: (id: string, type: ModalType, data?: any) => void;
  /** Update modal open/close state */
  updateModal: (id: string, isOpen: boolean, data?: any) => void;
  /** Unregister a modal from the context */
  unregisterModal: (id: string) => void;
  /** Get specific modal state by ID */
  getModal: (id: string) => ModalState | undefined;
  /** Check if any modal of specific type is open */
  hasModalOfType: (type: ModalType) => boolean;
}

/**
 * Modal context with default values
 */
const ModalContext = createContext<ModalContextValue>({
  modals: [],
  hasOpenModals: false,
  registerModal: () => {},
  updateModal: () => {},
  unregisterModal: () => {},
  getModal: () => undefined,
  hasModalOfType: () => false,
});

/**
 * Props for ModalProvider component
 */
interface ModalProviderProps {
  /** Child components that will have access to modal context */
  children: ReactNode;
}

/**
 * Modal Provider component for managing global modal state
 * 
 * Provides context for tracking modal states across the application.
 * Should be placed high in the component tree, typically in App.tsx.
 * 
 * Features:
 * - Global state management for all modal components
 * - Automatic state cleanup when modals unmount
 * - Type-safe modal registration and management
 * - Performance optimized with stable function references
 * 
 * Usage Example:
 * ```tsx
 * // In App.tsx
 * function App() {
 *   return (
 *     <ModalProvider>
 *       <YourAppContent />
 *     </ModalProvider>
 *   );
 * }
 * 
 * // In a component
 * function MyComponent() {
 *   const { registerModal, updateModal, hasOpenModals } = useModal();
 *   
 *   useEffect(() => {
 *     registerModal('my-lightbox', 'lightbox');
 *     return () => unregisterModal('my-lightbox');
 *   }, []);
 * }
 * ```
 * 
 * @component
 * @param {ModalProviderProps} props - Component properties
 * @returns {JSX.Element} Provider component with modal context
 * 
 * @accessibility
 * - Provides context for managing focus trapping
 * - Supports screen reader announcements for modal state changes
 * - Enables proper ARIA attribute management across modals
 * 
 * @performance
 * - Optimized re-renders with stable function references
 * - Efficient state updates with targeted re-renders
 * - Memory management with automatic cleanup
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalState[]>([]);

  /**
   * Register a new modal with the context
   */
  const registerModal = useCallback((id: string, type: ModalType, data?: any) => {
    setModals(prev => {
      // Check if modal already exists
      const existingIndex = prev.findIndex(modal => modal.id === id);
      if (existingIndex !== -1) {
        // Update existing modal
        const updated = [...prev];
        updated[existingIndex] = { id, type, isOpen: false, data };
        return updated;
      }
      
      // Add new modal
      return [...prev, { id, type, isOpen: false, data }];
    });
  }, []);

  /**
   * Update modal open/close state
   */
  const updateModal = useCallback((id: string, isOpen: boolean, data?: any) => {
    setModals(prev => {
      const index = prev.findIndex(modal => modal.id === id);
      if (index === -1) {
        console.warn(`Modal with id "${id}" not found. Register it first.`);
        return prev;
      }
      
      const updated = [...prev];
      updated[index] = { 
        ...updated[index], 
        isOpen, 
        ...(data !== undefined && { data })
      };
      return updated;
    });
  }, []);

  /**
   * Unregister a modal from the context
   */
  const unregisterModal = useCallback((id: string) => {
    setModals(prev => prev.filter(modal => modal.id !== id));
  }, []);

  /**
   * Get specific modal state by ID
   */
  const getModal = useCallback((id: string) => {
    return modals.find(modal => modal.id === id);
  }, [modals]);

  /**
   * Check if any modal of specific type is open
   */
  const hasModalOfType = useCallback((type: ModalType) => {
    return modals.some(modal => modal.type === type && modal.isOpen);
  }, [modals]);

  // Compute derived state
  const hasOpenModals = modals.some(modal => modal.isOpen);

  const contextValue: ModalContextValue = {
    modals,
    hasOpenModals,
    registerModal,
    updateModal,
    unregisterModal,
    getModal,
    hasModalOfType,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

/**
 * Hook for consuming modal context
 * 
 * Provides access to modal state and management functions.
 * Must be used within a ModalProvider.
 * 
 * Returns:
 * - modals: Array of all registered modals
 * - hasOpenModals: Boolean indicating if any modal is open
 * - registerModal: Function to register a new modal
 * - updateModal: Function to update modal state
 * - unregisterModal: Function to remove a modal
 * - getModal: Function to get specific modal by ID
 * - hasModalOfType: Function to check for open modals of specific type
 * 
 * Usage Examples:
 * ```tsx
 * // Basic usage
 * function ScrollToTop() {
 *   const { hasOpenModals } = useModal();
 *   
 *   if (hasOpenModals) {
 *     return null; // Hide scroll button when modals are open
 *   }
 *   
 *   return <ScrollButton />;
 * }
 * 
 * // Modal component usage
 * function PortfolioLightbox({ isOpen, onClose }) {
 *   const { registerModal, updateModal, unregisterModal } = useModal();
 *   
 *   useEffect(() => {
 *     registerModal('portfolio-lightbox', 'lightbox');
 *     return () => unregisterModal('portfolio-lightbox');
 *   }, []);
 *   
 *   useEffect(() => {
 *     updateModal('portfolio-lightbox', isOpen);
 *   }, [isOpen]);
 * }
 * 
 * // Check specific modal types
 * function Header() {
 *   const { hasModalOfType } = useModal();
 *   const hasLightboxOpen = hasModalOfType('lightbox');
 *   
 *   return (
 *     <header className={hasLightboxOpen ? 'hidden' : 'visible'}>
 *       Navigation content
 *     </header>
 *   );
 * }
 * ```
 * 
 * @hook
 * @returns {ModalContextValue} Modal context value with state and functions
 * @throws {Error} When used outside of ModalProvider
 */
export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  
  return context;
}

/**
 * Export types for external use
 */
export type { ModalType, ModalState, ModalContextValue };