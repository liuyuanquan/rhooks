import React, { useState, useRef } from 'react';
import { useClickAway } from '@xumi/rhooks';

const MultiClickAwayDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setCounter(s => s + 1);
  }, [ref1, ref2]);

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
      }}
    >
      <h2>useClickAway Multi Targets Demo</h2>
      <p>点击外部区域计数: {counter}</p>
      <div
        ref={ref1}
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
        目标区域 1
      </div>
      <div
        ref={ref2}
        style={{
          width: 200,
          height: 100,
          background: '#ff9800',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        目标区域 2
      </div>
      <p>点击这两个目标区域外部来增加计数器</p>
    </div>
  );
};

export default MultiClickAwayDemo;