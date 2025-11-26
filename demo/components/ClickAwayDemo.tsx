import React, { useState, useRef } from 'react';
import { useClickAway } from '@xumi/rhooks';

const ClickAwayDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setCounter(s => s + 1);
  }, ref);

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
      }}
    >
      <h2>useClickAway Demo</h2>
      <p>点击外部区域计数: {counter}</p>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 100,
          background: '#2196f3',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        目标区域
      </div>
      <p>点击目标区域外部来增加计数器</p>
    </div>
  );
};

export default ClickAwayDemo;