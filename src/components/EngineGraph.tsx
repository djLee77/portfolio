import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import type { EventObject } from 'cytoscape';

export function EngineGraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        // Inputs
        { data: { id: 'Task', label: '엔진 조립\n작업 (Task)' }, position: { x: 50, y: 160 } },
        
        { data: { id: 'Cond1', label: '작업자\n숙련도' }, position: { x: 250, y: 60 } },
        { data: { id: 'Cond2', label: '누적\n피로도' }, position: { x: 250, y: 160 } },
        { data: { id: 'Cond3', label: '근무\n스케줄' }, position: { x: 250, y: 260 } },
        
        // Engine Core
        { data: { id: 'Engine', label: '최적화 알고리즘\n(선별 엔진)' }, position: { x: 550, y: 160 } },
        
        // Output Workers
        { data: { id: 'W_A', label: '작업자 A\n(휴식/식사 중)' }, position: { x: 850, y: 60 } },
        { data: { id: 'W_B', label: '작업자 B\n(최적 할당 대상)' }, position: { x: 850, y: 160 } },
        { data: { id: 'W_C', label: '작업자 C\n(숙련도 미달)' }, position: { x: 850, y: 260 } },

        // Edges: Task -> Engine
        { data: { id: 'e_task', source: 'Task', target: 'Engine' } },
        
        // Edges: Conditions -> Engine
        { data: { id: 'e_c1', source: 'Cond1', target: 'Engine' } },
        { data: { id: 'e_c2', source: 'Cond2', target: 'Engine' } },
        { data: { id: 'e_c3', source: 'Cond3', target: 'Engine' } },

        // Edges: Engine -> Workers
        { data: { id: 'e_wA', source: 'Engine', target: 'W_A', label: '조건 미달 (필터링)' } },
        { data: { id: 'e_wB', source: 'Engine', target: 'W_B', label: '할당 승인 (배치 최적화)' } },
        { data: { id: 'e_wC', source: 'Engine', target: 'W_C', label: '조건 미달 (필터링)' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'shape': 'round-rectangle',
            'background-color': '#ffffff',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#475569',
            'font-size': '10px',
            'font-weight': 'bold',
            'text-wrap': 'wrap',
            'border-width': '2px',
            'border-color': '#e2e8f0',
            'width': '80px',
            'height': '40px' as any
          }
        },
        {
          selector: 'node[id = "Task"]',
          style: {
            'background-color': '#1e293b',
            'color': '#ffffff',
            'border-color': '#1e293b',
            'shape': 'ellipse',
            'width': '65px',
            'height': '65px' as any,
            'font-size': '11px',
            'font-weight': 'bold',
          }
        },
        {
          selector: 'node[id = "Engine"]',
          style: {
            'background-color': '#3b82f6',
            'color': '#ffffff',
            'font-size': '12px',
            'font-weight': 'bold',
            'border-color': '#3b82f6',
            'width': '100px',
            'height': '50px' as any
          }
        },
        {
          selector: 'node[id = "W_B"]',
          style: {
            'background-color': '#ecfdf5',
            'color': '#059669',
            'font-weight': 'bold',
            'border-color': '#10b981',
            'border-width': '2px'
          }
        },
        {
          selector: 'node[id = "W_A"], node[id = "W_C"]',
          style: {
            'opacity': 0.4,
            'color': '#94a3b8'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.1
          }
        },
        {
          selector: 'edge[target = "Engine"]',
          style: {
            'line-style': 'dashed',
            'line-dash-pattern': [4, 4]
          }
        },
        {
          selector: 'edge[target = "W_A"], edge[target = "W_C"]',
          style: {
            'line-style': 'solid',
            'line-color': '#f1f5f9',
            'target-arrow-color': '#f1f5f9',
            'label': 'data(label)',
            'font-size': '9px',
            'color': '#94a3b8',
            'text-background-opacity': 1,
            'text-background-color': '#ffffff',
            'text-background-padding': '1px'
          }
        },
        {
          selector: 'edge[target = "W_B"]',
          style: {
            'line-color': '#10b981',
            'target-arrow-color': '#10b981',
            'width': 3,
            'label': 'data(label)',
            'font-size': '10px',
            'color': '#059669',
            'font-weight': 'bold',
            'text-background-opacity': 1,
            'text-background-color': '#ffffff',
            'text-background-padding': '2px',
          }
        },
        {
          selector: 'edge[source = "Task"]',
          style: {
            'line-color': '#1e293b',
            'target-arrow-color': '#1e293b',
            'line-style': 'solid',
            'width': 3
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
      if (node.id() !== 'Engine' && node.id() !== 'Task' && node.id() !== 'W_B') {
        node.style({ 'border-color': '#3b82f6', 'border-width': '3px' });
      }
    });

    cy.on('mouseout', 'node', function(evt: EventObject){
      const node = evt.target;
      if (node.id() !== 'Engine' && node.id() !== 'Task' && node.id() !== 'W_B') {
        node.style({ 'border-color': '#e2e8f0', 'border-width': '2px' });
      }
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
      border: '1px solid #f1f5f9',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      marginTop: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '15px', left: '20px', zIndex: 10 }}>
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#3182f6', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>최적화 알고리즘 논리 모델</p>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
