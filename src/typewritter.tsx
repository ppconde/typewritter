import { useEffect, useRef, useState } from "react";
import { ReactNode, FC } from "react";

interface TypewriterProps {
    children: ReactNode[];
    delay: number;
}

const Typewriter: FC<TypewriterProps> = ({ children, delay }) => {
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const originalContentRef = useRef<ReactNode[]>([]);

    useEffect(() => {
        // Store the original HTML content of each element
        elementsRef.current.forEach((element, index) => {
            if (element) {
                originalContentRef.current[index] = element.innerHTML;
            }
        });
    }, [children]);

    useEffect(() => {
        // Clear all content initially if at the starting point
        if (currentTextIndex === 0 && currentCharIndex === 0) {
            elementsRef.current.forEach((element) => {
                if (element) element.innerHTML = "";
            });
        }

        const typeNextChar = () => {
            if (currentTextIndex < originalContentRef.current.length) {
                const originalHTML = originalContentRef.current[currentTextIndex] as string;
                const currentElement = elementsRef.current[currentTextIndex];

                if (currentCharIndex < originalHTML.length) {
                    // Determine if the current position is within a tag
                    const nextTagClose = originalHTML.indexOf(">", currentCharIndex);
                    const isTag = originalHTML[currentCharIndex] === "<";

                    // Render content up to the next tag close or character
                    if (isTag && nextTagClose !== -1) {
                        currentElement.innerHTML = originalHTML.substring(
                            0,
                            nextTagClose + 1
                        );
                        setCurrentCharIndex(nextTagClose + 1);
                    } else {
                        currentElement.innerHTML = originalHTML.substring(
                            0,
                            currentCharIndex + 1
                        );
                        setCurrentCharIndex(currentCharIndex + 1);
                    }
                } else {
                    // Move to the next text block
                    setCurrentCharIndex(0);
                    setCurrentTextIndex(currentTextIndex + 1);
                }
            }
        };

        const interval = setInterval(typeNextChar, delay);
        return () => clearInterval(interval);
    }, [currentCharIndex, currentTextIndex, delay]);

    return (
        <div>
            {children.map((child, index) => (
                <div
                    key={index}
                    ref={(el) => (elementsRef.current[index] = el!)}
                    style={{
                        whiteSpace: "pre-wrap",
                        visibility: index <= currentTextIndex ? "visible" : "hidden",
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default Typewriter;
