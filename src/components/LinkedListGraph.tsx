import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import type { EventObject } from 'cytoscape';

export function LinkedListGraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        // ====== GRAPH A (Order A) ======
        { data: { id: 'A1', label: '작업물 A-1' }, position: { x: 100, y: 80 } },
        { data: { id: 'A2', label: '작업물 A-2' }, position: { x: 400, y: 80 } },
        { data: { id: 'A3', label: '작업물 A-3' }, position: { x: 700, y: 80 } },
        
        // ====== GRAPH B (Order B) ======
        { data: { id: 'B1', label: '작업물 B-1' }, position: { x: 100, y: 260 } },
        { data: { id: 'B2', label: '작업물 B-2' }, position: { x: 400, y: 260 } },
        { data: { id: 'B3', label: '작업물 B-3' }, position: { x: 700, y: 260 } },
        
        // ====== SHARED & LOCAL MATERIALS ======
        { data: { id: 'M_Shared', label: '공통 필수 자재\n[100kg 잔여]' }, position: { x: 250, y: 170 } },
        { data: { id: 'M_A', label: 'A 전용 부자재\n[500ea 잔여]' }, position: { x: 550, y: 170 } },

        // ====== EDGES (Sequences) ======
        { data: { id: 'e_A1', source: 'A1', target: 'A2', type: 'sequence' } },
        { data: { id: 'e_A2', source: 'A2', target: 'A3', type: 'sequence' } },
        { data: { id: 'e_B1', source: 'B1', target: 'B2', type: 'sequence' } },
        { data: { id: 'e_B2', source: 'B2', target: 'B3', type: 'sequence' } },

        // ====== EDGES (Material Consumption) ======
        // Job A-1 consumes shared material successfully
        { data: { id: 'c_A1_M', source: 'A1', target: 'M_Shared', label: '사전 확보됨 (-100kg)', type: 'consume_success' } },
        
        // Job B-2 attempts to consume shared material but fails (competition lost)
        { data: { id: 'c_B2_M', source: 'B2', target: 'M_Shared', label: '경합 실패 (자재 부족!)', type: 'consume_fail' } },
        
        // Non-competing regular consumptions
        { data: { id: 'c_A2_MA', source: 'A2', target: 'M_A', label: '확보됨 (-200ea)', type: 'consume_success' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-wrap': 'wrap',
          }
        },
        {
          selector: 'node[id ^= "A"], node[id ^= "B"]',
          style: {
            'shape': 'round-rectangle',
            'background-color': '#ffffff',
            'border-width': '2px',
            'width': '90px',
            'height': '45px' as any,
          }
        },
        {
          selector: 'node[id ^= "A"]',
          style: {
            'border-color': '#3182f6',
            'color': '#3182f6'
          }
        },
        {
          selector: 'node[id ^= "B"]',
          style: {
            'border-color': '#8b5cf6',
            'color': '#8b5cf6'
          }
        },
        // Highlight B2 as problematic
        {
          selector: 'node[id = "B2"]',
          style: {
            'border-style': 'dashed',
            'border-color': '#ef4444',
            'color': '#ef4444',
            'opacity': 0.8
          }
        },
        {
          selector: 'node[id ^= "M_"]',
          style: {
            'shape': 'barrel',
            'background-color': '#ecfccb',
            'border-color': '#84cc16',
            'border-width': '2px',
            'color': '#4d7c0f',
            'width': '100px',
            'height': '50px' as any,
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'curve-style': 'bezier',
            'arrow-scale': 1.2
          }
        },
        {
          selector: 'edge[type = "sequence"]',
          style: {
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'width': 3
          }
        },
        {
          selector: 'edge[type = "consume_success"]',
          style: {
            'line-color': '#94a3b8',
            'target-arrow-color': '#94a3b8',
            'target-arrow-shape': 'triangle',
            'line-style': 'solid',
            'label': 'data(label)',
            'font-size': '10px',
            'color': '#64748b',
            'font-weight': 'bold',
            'text-background-opacity': 1,
            'text-background-color': '#ffffff',
            'text-background-padding': '2px',
            'text-border-width': 1,
            'text-border-color': '#e2e8f0',
            'text-border-style': 'solid'
          }
        },
        {
          selector: 'edge[type = "consume_fail"]',
          style: {
            'line-color': '#ef4444',
            'target-arrow-color': '#ef4444',
            'target-arrow-shape': 'triangle-cross',
            'line-style': 'dashed',
            'width': 3,
            'label': 'data(label)',
            'font-size': '10px',
            'font-weight': 'bold',
            'color': '#ef4444',
            'text-background-opacity': 1,
            'text-background-color': '#fef2f2',
            'text-background-padding': '2px',
            'text-border-width': 1,
            'text-border-color': '#ef4444',
            'text-border-style': 'solid'
          }
        }
      ],
      layout: {
        name: 'preset' 
      },
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false
    });

    // Hover Animation
    cy.on('mouseover', 'node', function(evt: EventObject){
      const node = evt.target;
      if (node.id().startsWith('A') || node.id().startsWith('B')) {
        node.style({ 'border-width': '3px' });
      }
      if (node.id().startsWith('M_')) {
        node.style({ 'background-color': '#d9f99d' });
      }
      // Highlight connected consumption edges
      node.connectedEdges('[type="consume_success"], [type="consume_fail"]').style({ 
        'width': 4, 
        'font-size': '11px' 
      });
      node.connectedEdges('[type="consume_success"]').style({
        'line-color': '#3b82f6', 
        'target-arrow-color': '#3b82f6', 
        'color': '#3b82f6', 
        'text-border-color': '#3b82f6'
      });
    });

    cy.on('mouseout', 'node', function(evt: EventObject){
      const node = evt.target;
      if (node.id() === 'B2') {
        node.style({ 'border-width': '2px', 'border-style': 'dashed' });
      } else if (node.id().startsWith('A') || node.id().startsWith('B')) {
        node.style({ 'border-width': '2px' });
      }
      
      if (node.id().startsWith('M_')) {
        node.style({ 'background-color': '#ecfccb' });
      }
      // Reset connected edges
      node.connectedEdges('[type="consume_success"]').forEach((edge: cytoscape.EdgeSingular) => {
        edge.style({ 
          'width': 2, 
          'line-color': '#94a3b8', 
          'target-arrow-color': '#94a3b8', 
          'color': '#64748b', 
          'text-border-color': '#e2e8f0',
          'font-size': '10px'
        });
      });
      node.connectedEdges('[type="consume_fail"]').forEach((edge: cytoscape.EdgeSingular) => {
        edge.style({ 
          'width': 3, 
          'font-size': '10px'
        });
      });
    });

    const resizeCy = () => {
      if (!cy.destroyed()) {
        cy.resize();
        cy.fit(undefined, 35);
      }
    };
    
    // Framer Motion의 슬라이드 전환 시간에 맞춰 매트릭스 재계산
    const t1 = setTimeout(resizeCy, 100);
    const t2 = setTimeout(resizeCy, 500);
    const t3 = setTimeout(resizeCy, 900);
    
    // 마우스가 진입할 때도 안전하게 Bounds 재동기화 보장
    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointerenter', resizeCy);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (container) container.removeEventListener('pointerenter', resizeCy);
      if (!cy.destroyed()) cy.destroy();
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '350px',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      marginTop: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '15px', left: '20px', zIndex: 10 }}>
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#3182f6', letterSpacing: '0.05em', marginBottom: '0.2rem', textTransform: 'uppercase' }}>자재 가용성 점검 시뮬레이션</p>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
