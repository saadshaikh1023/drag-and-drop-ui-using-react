import React, { memo, useCallback, useState } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import ShowMoreText from './ShowMoreText'; // Import ShowMoreText component

const CombinedNode = ({ id, data, selected }) => {
  const [dimensions, setDimensions] = useState({ width: 150, height: 60 });

  const handleResize = useCallback((event, { width, height }) => {
    setDimensions({ width, height });
  }, []);

  return (
    <>
      <NodeResizer
        color="transparent"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
        onResize={handleResize}
        lineStyle={{ width: '100%', height: '100%' }} // Ensures the border wraps around the node correctly
      />
      <div
        style={{
          width: dimensions.width,
          height: dimensions.height,
          border: '2px solid black',
          borderRadius: '4px',
          backgroundColor: '#ccd9f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box', // Ensures padding and border are included in the node's dimensions
          position: 'relative',
          overflow: 'hidden', // Ensure content does not overflow
        }}
      >
        <Handle type="target" position={Position.Left} />
        <div
          style={{
            textAlign: 'center',
            padding: '0 10px',
            width: '100%',
            height: '100%',
            overflow: 'hidden', // Hide overflowed text
            wordWrap: 'break-word', // Ensure long words break into the next line
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column', // Allow text to be vertically centered
          }}
        >
          {/* Use ShowMoreText to display the label */}
          <ShowMoreText text={data.label} maxWords={6} />
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
};

export default memo(CombinedNode);
