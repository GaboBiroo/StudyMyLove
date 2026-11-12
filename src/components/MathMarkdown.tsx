import React, { useMemo } from 'react';
import katex from 'katex';

interface MathMarkdownProps {
  text: string;
  className?: string;
}

function renderLatex(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex.trim(), {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch {
    return tex;
  }
}

function renderInlineSegments(line: string, keyPrefix: string): React.ReactNode[] {
  const tokenRegex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\*\*[^*]+?\*\*|`[^`]+?`)/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const html = renderLatex(part.slice(2, -2), true);
      return (
        <span
          key={key}
          className="block my-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      const html = renderLatex(part.slice(1, -1), false);
      return (
        <span
          key={key}
          className="inline-block align-middle mx-0.5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-mono text-[0.88em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

export const MathBlock: React.FC<{ latex: string; display?: boolean }> = ({
  latex,
  display = true,
}) => {
  const html = useMemo(() => renderLatex(latex, display), [latex, display]);
  return (
    <div
      className={display ? 'my-2 overflow-x-auto' : 'inline-block'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const MathMarkdown: React.FC<MathMarkdownProps> = ({
  text,
  className = '',
}) => {
  const blocks = useMemo(() => {
    const normalized = text.replace(/\r\n/g, '\n');
    const chunks = normalized.split(/(\$\$[\s\S]+?\$\$)/g);
    return chunks;
  }, [text]);

  return (
    <div className={`space-y-2.5 leading-relaxed text-[var(--text-primary)] ${className}`}>
      {blocks.map((chunk, cIdx) => {
        if (chunk.startsWith('$$') && chunk.endsWith('$$')) {
          return <MathBlock key={`disp-${cIdx}`} latex={chunk.slice(2, -2)} display />;
        }

        const lines = chunk.split('\n');
        const elements: React.ReactNode[] = [];
        let listBuffer: string[] = [];

        const flushList = (key: string) => {
          if (listBuffer.length === 0) return;
          elements.push(
            <ul key={key} className="list-disc pl-5 space-y-1.5 my-2">
              {listBuffer.map((item, li) => (
                <li key={`${key}-${li}`}>
                  {renderInlineSegments(item, `${key}-li-${li}`)}
                </li>
              ))}
            </ul>
          );
          listBuffer = [];
        };

        lines.forEach((rawLine, lIdx) => {
          const line = rawLine.trim();
          if (!line) {
            flushList(`list-${cIdx}-${lIdx}`);
            return;
          }
          if (line.startsWith('### ')) {
            flushList(`list-${cIdx}-${lIdx}`);
            elements.push(
              <h4
                key={`h4-${cIdx}-${lIdx}`}
                className="font-semibold text-[15px] text-[var(--text-primary)] pt-2"
              >
                {renderInlineSegments(line.slice(4), `h4s-${cIdx}-${lIdx}`)}
              </h4>
            );
            return;
          }
          if (line.startsWith('## ')) {
            flushList(`list-${cIdx}-${lIdx}`);
            elements.push(
              <h3
                key={`h3-${cIdx}-${lIdx}`}
                className="font-bold text-base text-[var(--text-primary)] pt-2"
              >
                {renderInlineSegments(line.slice(3), `h3s-${cIdx}-${lIdx}`)}
              </h3>
            );
            return;
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            listBuffer.push(line.slice(2));
            return;
          }

          flushList(`list-${cIdx}-${lIdx}`);
          elements.push(
            <p key={`p-${cIdx}-${lIdx}`}>
              {renderInlineSegments(line, `ps-${cIdx}-${lIdx}`)}
            </p>
          );
        });

        flushList(`list-end-${cIdx}`);
        return <React.Fragment key={`chunk-${cIdx}`}>{elements}</React.Fragment>;
      })}
    </div>
  );
};
