import React from 'react';

interface AnnotationWrapperProps {
  targetName: string;
  children: React.ReactNode;
  className?: string;
}

export const AnnotationWrapper: React.FC<AnnotationWrapperProps> = ({
  targetName,
  children,
  className,
}) => {
  void targetName;
  return <div className={className}>{children}</div>;
};
