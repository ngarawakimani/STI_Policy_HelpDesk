/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React from "react";

interface DataProps {
  details: string;
}

const DescriptionCard = ({ details }: DataProps) => {
  const sentences = details ? details.match(/[^.!?]+[.!?]+|[^.!?]+$/g) : [];
  const paragraphs: string[] = [];

  let currentParagraph = "";
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i]?.trim();

    if (sentence) {
      if (
        currentParagraph.split(" ").length + sentence.split(" ").length <=
        50
      ) {
        currentParagraph += ` ${sentence}`;
      } else {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = sentence;
      }
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.trim());
  }

  return (
    <div className="prose">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default DescriptionCard;
