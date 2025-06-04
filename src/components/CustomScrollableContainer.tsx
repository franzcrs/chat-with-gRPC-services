/**
 * Filename: CustomScrollableContainer.tsx
 * Author: Franz Chuquirachi
 * Created: 2025-01-28
 * Copyright © 2025 Franz Arthur Chuquirachi Rosales. All rights reserved.
 */

import React, { useState, useRef, useEffect } from 'react'

/**
 * Props for the CustomScrollableContainer component.
 *
 * @property children - The content to be rendered inside the scrollable container.
 * @property id - Optional HTML id attribute for the container element.
 * @property className - Optional CSS class name(s) to apply to the container.
 * @property scrollbars - Whether to display native scrollbars (defaults to false).
 * @property enablePan - Whether to enable click-and-drag panning (defaults to false).
 */
type CustomScrollableContainerProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  scrollbars?: boolean;
  enablePan?: boolean;
}

/**
 * A customizable scrollable container that displays stylized scrollbars with transparent background
 * and optionally enable click-and-drag panning of its content.
 * 
 * To change the style(dimensions and colors) of the scrollbars, modify the CSS class custom-scrollbar
 * and its pseudoelements in the index.css file.
 *
 * @param children      The content to render inside the scrollable container.
 * @param id            An optional HTML id attribute for the container element.
 * @param className     Additional CSS class names to apply to the container.
 * @param scrollbars    Whether to show custom scrollbars (default: true).
 * @param enablePan     Whether to enable click-and-drag panning (default: false).
 * 
 * @returns A React element wrapping the provided children in a styled, scrollable div.
 */
const CustomScrollableContainer = ({ children, id, className, scrollbars = true, enablePan = false }: CustomScrollableContainerProps) => {

  // Drag variables
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const dragStartScrollTop = useRef(0);
  const [cursorGrabbing, setCursorGrabbing] = useState(false);

  const [initialized, setInitialized] = useState(false);

  // Update 2025-06-03: Add a state to track the previous container height
  const [containerHeight, setContainereHeight] = useState(0);

  // Handle for the start of drag action
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (enablePan) {
      console.log('Drag start');
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
      dragStartScrollLeft.current = containerRef.current?.scrollLeft || 0;
      dragStartScrollTop.current = containerRef.current?.scrollTop || 0;
      isDragging.current = true;
    }
    document.body.classList.add('select-none'); // Disable text selection
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    setCursorGrabbing(true);
    console.log('Dragging');
    e.preventDefault();
    const walkX = (e.clientX - dragStartX.current) * 1.0;
    const walkY = (e.clientY - dragStartY.current) * 1.0;
    if (!containerRef.current) return;
    // const { scrollWidth, scrollHeight, clientWidth, clientHeight } = containerRef.current;
    containerRef.current.scrollLeft = dragStartScrollLeft.current - walkX;// * (scrollWidth / clientWidth);
    containerRef.current.scrollTop = dragStartScrollTop.current - walkY;// * (scrollHeight / clientHeight);
  };
  const handleMouseUp = () => {
    if (enablePan && isDragging.current) {
      console.log('Drag end');
      isDragging.current = false;
      setCursorGrabbing(false);
    }
    document.body.classList.remove('select-none'); // Enable text selection
  };

  // Execute functions on component mount with cleanup
  useEffect(() => {
    if (!enablePan) { isDragging.current = false; }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    if (containerRef.current && enablePan && !initialized) {
      const container = containerRef.current;
      const scrollableWidth = container.scrollWidth - container.clientWidth;
      // const scrollableHeight = container.scrollHeight - container.clientHeight;
      // Get the first child's vertical inset value
      const firstChild = container.firstElementChild as HTMLElement;
      const firstChildStyle = window.getComputedStyle(firstChild);
      const firstChildVerticalInset = parseInt(firstChildStyle.inset.split(' ')[0]) || 0;
      
      container.scrollLeft = scrollableWidth / 2;
      container.scrollTop = firstChildVerticalInset - 40;
      setInitialized(true);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Check if child has padding-right
  const hasPaddingRight = (child: React.ReactElement): boolean => {
    const style = child.props.style;
    const className = child.props.className || '';

    return (
      // Check inline styles
      (style?.paddingRight !== undefined) ||
      (style?.padding !== undefined) ||
      // Check Tailwind classes
      className.match(/\b(pr-|px-)\d+/) !== null ||
      // Check regular CSS classes
      className.includes('padding-right') ||
      className.includes('has-padding')
    );
  };
  // Check if child has cursor style is not default
  const hasCursorStyle = (child: React.ReactElement): boolean => {
    const style = child.props.style;
    const className = child.props.className || '';

    return (
      // Check inline styles
      (style?.cursor !== undefined) ||
      // Check Tailwind classes
      className.match(/\bcursor-\w+/) !== null ||
      // Check regular CSS classes
      className.includes('cursor')
    );
  };

  // Style the children with padding-right
  const styleTopChildren = (): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childElement = child as React.ReactElement;
        return hasPaddingRight(childElement)
          ? React.cloneElement(childElement, {
            className: `${childElement.props.className || ''} pr-2`.trim()
          })
          : child; // Return unchanged style
      }
      return child;
    });
  }
  // Style the children with padding-right and erasing cursor style
  const styleTopChildrenSpanEnabled = (): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childElement = child as React.ReactElement;
        if (hasPaddingRight(childElement) && hasCursorStyle(childElement)) {
          const classNameWithoutCursor = childElement.props.className?.split(' ').filter((cls: string | string[]) => !cls.includes('cursor')).join(' ') || '';
          return React.cloneElement(childElement, {
            className: classNameWithoutCursor + ' pr-2'
          });
        } else if (hasPaddingRight(childElement)) {
          return React.cloneElement(childElement, {
            className: `${childElement.props.className || ''} pr-2`.trim()
          });
        } else if (hasCursorStyle(childElement)) {
          const classNameWithoutCursor = childElement.props.className?.split(' ').filter((cls: string | string[]) => !cls.includes('cursor')).join(' ') || '';
          return React.cloneElement(childElement, {
            className: classNameWithoutCursor.trim()
          });
        }
        return child; // Return unchanged style
      }
      return child;
    });
  }

  // Update 2025-06-03: Added a handler to scroll to the bottom when children change
  const childrenChangeHandler = () => {
    if (!containerRef.current) return;
    if (containerRef.current.clientHeight !== containerHeight) {
      const container = containerRef.current;
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
    else {
      setContainereHeight(containerRef.current.clientHeight);
    }
  }
  useEffect(() => {
    childrenChangeHandler();
  }, [children])

  return (
    <div
      id={id}
      ref={containerRef}
      className={`${className} overflow-auto 
                  ${scrollbars ? 'custom-scrollbar' : 'hidden-scrollbar'} 
                  ${enablePan ? 'cursor-grab' : ''} 
                  ${enablePan && cursorGrabbing ? 'cursor-grabbing' : ''}`}
      onMouseDown={handleMouseDown}
    >
      {enablePan ? styleTopChildrenSpanEnabled() : styleTopChildren()}
    </div>
  )
}

export default CustomScrollableContainer