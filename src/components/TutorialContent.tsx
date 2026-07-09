import React from 'react';

interface TutorialContentProps {
  text: string;
}

const cleanInlineText = (value: string) =>
  value
    .replace(/\$\$?/g, '')
    .replace(/\\?text\{([^}]+)\}/g, '$1')
    .replace(/\\?sum/g, 'sum')
    .replace(/\\?frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\?cdot/g, 'x')
    .replace(/\\?leq|\\?<=|\\?≤/g, '<=')
    .replace(/\\?geq|\\?>=|\\?≥/g, '>=')
    .replace(/\\?right|\\?left|\\?le ft|\\?≤ft/g, '')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const renderInline = (value: string) => {
  const parts = cleanInlineText(value).split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

export const TutorialContent: React.FC<TutorialContentProps> = ({ text }) => {
  const lines = text
    .replace(/\r\n/g, '\n')
    .replace(/\\?≤ft/g, '')
    .replace(/\\?≤/g, '<=')
    .replace(/\\?≥/g, '>=')
    .split('\n');

  const nodes: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let orderedList = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    nodes.push(<p key={`p-${nodes.length}`}>{renderInline(paragraph.join(' '))}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    const ListTag = orderedList ? 'ol' : 'ul';
    nodes.push(
      <ListTag key={`list-${nodes.length}`}>
        {listItems.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ListTag>,
    );
    listItems = [];
  };

  lines.forEach(rawLine => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      nodes.push(<h3 key={`h-${nodes.length}`}>{renderInline(line.replace(/^###\s+/, ''))}</h3>);
      return;
    }

    if (line.startsWith('$$') && line.endsWith('$$')) {
      flushParagraph();
      flushList();
      nodes.push(<div key={`formula-${nodes.length}`} className="formula-box">{cleanInlineText(line)}</div>);
      return;
    }

    const listMatch = line.match(/^(\* |- |\d+\.)\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      const isOrdered = /^\d+\./.test(listMatch[1]);
      if (listItems.length > 0 && orderedList !== isOrdered) flushList();
      orderedList = isOrdered;
      listItems.push(listMatch[2]);
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return <div className="tutorial-content">{nodes}</div>;
};
