import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { varContext } from '../Context/Context';

const MarkdownRenderer = () => {
  const {resultData} = useContext(varContext)
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {resultData}
      </ReactMarkdown>
    </div>
  );
};
export default MarkdownRenderer;
