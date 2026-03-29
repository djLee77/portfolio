import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import type { EventObject } from 'cytoscape';

export function WorkflowGraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        // 1. Data Sources (Barrel)
        { data: { id: 'ERP', label: 'ERP 인터페이스\n(Interface)' }, position: { x: 50, y: 80 } },
        { data: { id: 'CRUD', label: '사용자 설정 데이터\n(User CRUD)' }, position: { x: 50, y: 260 } },
        
        // 2. Version Data -> Engine -> Output
        { data: { id: 'VER', label: '버전 생성\n(입력 데이터)' }, position: { x: 300, y: 170 } },
        { data: { id: 'ENG', label: '시뮬레이션\n엔진' }, position: { x: 550, y: 170 } },
        { data: { id: 'OUT', label: 'Output 테이블\n(시뮬레이션 결과)' }, position: { x: 800, y: 170 } },
        
        // 3. UI Screens
        { data: { id: 'UI_PSI', label: 'PSI 뷰 화면' }, position: { x: 1050, y: 80 } },
        { data: { id: 'UI_PLAN', label: '생산계획조회 화면' }, position: { x: 1050, y: 260 } },

        // Edges
        // Create Version
        { data: { id: 'e_erp_ver', source: 'ERP', target: 'VER', label: '[버전생성 버튼 클릭]' } },
        { data: { id: 'e_crud_ver', source: 'CRUD', target: 'VER', label: '[버전생성 버튼 클릭]' } }, 
        
        // Run Engine
        { data: { id: 'e_run', source: 'VER', target: 'ENG', label: '[엔진 실행 버튼 클릭]', action: 'RUN_ENGINE' } },
        
        // Output saving
        { data: { id: 'e_save', source: 'ENG', target: 'OUT', label: 'DB 저장' } },
        
        // Render UI
        { data: { id: 'e_ui1', source: 'OUT', target: 'UI_PSI', label: 'UI 렌더링' } },
        { data: { id: 'e_ui2', source: 'OUT', target: 'UI_PLAN', label: 'UI 렌더링' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '10.5px',
            'font-weight': 'bold',
            'text-wrap': 'wrap',
            'color': '#ffffff'
          }
        },
        // Database / Data nodes
        {
          selector: 'node[id = "ERP"], node[id = "CRUD"], node[id = "OUT"]',
          style: {
            'shape': 'barrel',
            'background-color': '#10b981',
            'border-width': '2px',
            'border-color': '#047857',
            'width': '100px',
            'height': '55px' as any,
          }
        },
        // Special highlighting for Version Data
        {
          selector: 'node[id = "VER"]',
          style: {
            'shape': 'barrel',
            'background-color': '#f59e0b',
            'border-color': '#b45309',
            'border-width': '2px',
            'width': '100px',
            'height': '55px' as any,
          }
        },
        // Engine Node
        {
          selector: 'node[id = "ENG"]',
          style: {
            'shape': 'hexagon',
            'background-color': '#8b5cf6',
            'border-width': '2px',
            'border-color': '#5b21b6',
            'width': '110px',
            'height': '65px' as any,
            'font-size': '11.5px'
          }
        },
        // UI Nodes
        {
          selector: 'node[id ^= "UI_"]',
          style: {
            'shape': 'round-rectangle',
            'background-color': '#3182f6',
            'border-width': '2px',
            'border-color': '#1d4ed8',
            'width': '95px',
            'height': '50px' as any,
          }
        },
        // Edges Base
        {
          selector: 'edge',
          style: {
            'width': 2,
            'curve-style': 'bezier',
            'arrow-scale': 1.2,
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'label': 'data(label)',
            'font-size': '9.5px',
            'color': '#64748b',
            'text-background-opacity': 1,
            'text-background-color': '#ffffff',
            'text-background-padding': '2px',
            'text-border-opacity': 0,
          }
        },
        // Highlight specific action edges
        {
          selector: 'edge[action = "RUN_ENGINE"]',
          style: {
            'line-color': '#8b5cf6',
            'target-arrow-color': '#8b5cf6',
            'width': 4,
            'font-size': '10px',
            'font-weight': 'bold',
            'color': '#8b5cf6',
            'text-border-width': 1,
            'text-border-color': '#8b5cf6',
            'text-border-opacity': 1,
            'text-border-style': 'solid',
            'text-background-shape': 'round-rectangle' as any
          }
        },
        // Highlight the merge edges conceptually
        {
          selector: 'edge[source = "ERP"], edge[source = "CRUD"]',
          style: {
            'line-style': 'dashed',
            'line-color': '#f59e0b',
            'target-arrow-color': '#f59e0b',
            'width': 2,
            'color': '#b45309',
            'font-weight': 'bold',
            'text-border-width': 1,
            'text-border-color': '#f59e0b',
            'text-border-opacity': 0.3,
            'text-border-style': 'solid',
            'text-background-shape': 'round-rectangle' as any
          }
        },
        // Highlight output save edge
        {
          selector: 'edge[source = "ENG"]',
          style: {
            'line-color': '#10b981',
            'target-arrow-color': '#10b981',
            'width': 3,
            'color': '#047857',
            'font-weight': 'bold'
          }
        },
        // UI edges
        {
          selector: 'edge[source = "OUT"]',
          style: {
            'line-color': '#3182f6',
            'target-arrow-color': '#3182f6',
            'width': 2,
            'color': '#1d4ed8'
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
      node.style({ 'border-width': '4px' });
      node.connectedEdges().style({ 'width': 4, 'font-size': '10.5px' });
    });

    cy.on('mouseout', 'node', function(evt: EventObject){
      const node = evt.target;
      node.style({ 'border-width': '2px' });
      // Reset connected edges based on specific styling rules
      node.connectedEdges().forEach((edge: cytoscape.EdgeSingular) => {
        let width = 2;
        let pSize = '9.5px';
        if(edge.data('action') === 'RUN_ENGINE' || edge.source().id() === 'ENG') {
          width = edge.data('action') === 'RUN_ENGINE' ? 4 : 3;
        }
        edge.style({ 'width': width, 'font-size': pSize });
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
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: '#8b5cf6', letterSpacing: '0.05em', marginBottom: '0.2rem', textTransform: 'uppercase' }}>시스템 아키텍처 워크플로우</p>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
