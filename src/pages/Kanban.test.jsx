import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Kanban from './Kanban';
import { MemoryRouter } from 'react-router-dom';

// Create mocks for Supabase chain
const { mockFrom, mockSelect, mockOrder } = vi.hoisted(() => {
    return {
        mockFrom: vi.fn(),
        mockSelect: vi.fn(),
        mockOrder: vi.fn()
    };
});

vi.mock('../lib/supabaseClient', () => ({
    supabase: {
        from: mockFrom
    },
}));

describe('Kanban Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Default chain setup
        mockFrom.mockReturnValue({ select: mockSelect });
        mockSelect.mockReturnThis(); // or create specific object if needed, usually .select().order()
        // Wait, the component does .select('*').order(...)
        // So .select must return an object with .order
        mockSelect.mockReturnValue({ order: mockOrder });
    });

    it('renders loading state initially', async () => {
        // Return a promise that never resolves to simulate loading
        mockOrder.mockImplementation(() => new Promise(() => { }));

        const { container } = render(
            <MemoryRouter>
                <Kanban />
            </MemoryRouter>
        );

        // Check for loading spinner or skeleton
        // The component renders a skeleton with class 'animate-pulse' when loading
        expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('renders columns and cards after loading', async () => {
        const mockCandidates = [
            { id: 1, nome: 'João da Silva', created_at: '2025-12-01', status: 'Planejamento' },
            { id: 2, nome: 'Maria Souza', created_at: '2025-12-02', status: 'Homologado' }
        ];

        // Ensure the chain resolves to data
        mockOrder.mockResolvedValue({ data: mockCandidates, error: null });

        render(
            <MemoryRouter>
                <Kanban />
            </MemoryRouter>
        );

        // Wait for Loading to finish
        // We expect 'Fluxo de Convocação' (h2) or column titles
        await waitFor(() => {
            expect(screen.getByText('Fluxo de Convocação')).toBeInTheDocument();
        });

        // Debug output if needed
        // screen.debug();

        // Check column titles (The component uses titles like "Classificados / Aguardando")
        // "Planejamento" status typically maps to 'aguardando_envio' (if not found in map? Check logic)
        // Logic: Object.keys(STATUS_MAP).find(...)
        // 'Planejamento' is NOT in STATUS_MAP in the file I read.
        // STATUS_MAP = { 'Classificado': ..., 'Em Análise': ..., 'Homologado': ... }
        // The fallback is 'aguardando_envio'.

        expect(screen.getByText('Classificados / Aguardando')).toBeInTheDocument();
        expect(screen.getByText('Homologado / Contratado')).toBeInTheDocument();

        // Check card content
        expect(screen.getByText('João da Silva')).toBeInTheDocument();
        expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    });
});
