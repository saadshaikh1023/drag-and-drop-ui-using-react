import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import FloatingEdge from './feature/FloatingEdge';
import CustomConnectionLine from './feature/CustomConnectionLine';
import CombinedNode from './feature/CombinedNode'; // Import the new combined node component

import '@xyflow/react/dist/style.css';
import './style.css';

const initialNodes = [];
const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

const nodeTypes = {
  custom: CombinedNode, // Use the new combined node component
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const EasyConnectExample = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(0);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = () => {
    const newNode = {
      id: (nodeCount + 1).toString(),
      type: 'custom',
      position: { x: 30 * (nodeCount + 1), y: 30 * (nodeCount + 1) },
      data: { label: `This is a dummy text for the node number of ${nodeCount + 1} ` }, // Add label to data
    };

    console.log('Adding node:', newNode);
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      console.log('Updated nodes:', updatedNodes);
      return updatedNodes;
    });
    setNodeCount(nodeCount + 1);
  };

  const deleteLastNode = () => {
    setNodes((nds) => {
      const updatedNodes = nds.slice(0, -1); // Remove the last node
      console.log('Updated nodes after deletion:', updatedNodes);
      return updatedNodes;
    });
    setNodeCount((count) => Math.max(count - 1, 0));
  };

  return (
    <div className="react-flow-container">
        <button onClick={addNode} className="add-node-button">
        Add Node
      </button>
      <button onClick={deleteLastNode} className="delete-node-button">
        Delete Node
      </button>
      
    
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
      />
    </div>
  );
};

export default EasyConnectExample;
