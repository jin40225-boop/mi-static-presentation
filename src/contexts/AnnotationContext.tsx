import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AnnotationType = 'feature' | 'style' | 'content' | 'bug';

export interface Annotation {
  id: string;
  targetName: string;
  content: string;
  type: AnnotationType;
}

interface AnnotationContextType {
  isAnnotationMode: boolean;
  toggleAnnotationMode: () => void;
  annotations: Annotation[];
  addAnnotation: (annotation: Omit<Annotation, 'id'>) => void;
  removeAnnotation: (id: string) => void;
  clearAnnotations: () => void;
}

const AnnotationContext = createContext<AnnotationContextType | undefined>(undefined);

export const AnnotationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const toggleAnnotationMode = () => setIsAnnotationMode(prev => !prev);

  const addAnnotation = (annotation: Omit<Annotation, 'id'>) => {
    setAnnotations(prev => [
      ...prev,
      { ...annotation, id: Math.random().toString(36).substring(2, 9) }
    ]);
  };

  const removeAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
  };

  const clearAnnotations = () => setAnnotations([]);

  return (
    <AnnotationContext.Provider value={{
      isAnnotationMode,
      toggleAnnotationMode,
      annotations,
      addAnnotation,
      removeAnnotation,
      clearAnnotations
    }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotations = () => {
  const context = useContext(AnnotationContext);
  if (context === undefined) {
    throw new Error('useAnnotations must be used within an AnnotationProvider');
  }
  return context;
};
