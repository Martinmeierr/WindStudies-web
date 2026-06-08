import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import SondeoPrevio from './SondeoPrevio'

vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }))

function renderForm() {
  return render(
    <MemoryRouter>
      <SondeoPrevio />
    </MemoryRouter>,
  )
}

// Regresión: clickear las opciones no debe disparar React #185 (loop infinito).
// El bug original venía del Radix Checkbox de la pregunta 7 (multi-select).
describe('SondeoPrevio', () => {
  it('clickear un radio no rompe', () => {
    renderForm()
    fireEvent.click(screen.getByText(/Estoy arrancando/i))
    expect(screen.getByText(/Estoy arrancando/i)).toBeTruthy()
  })

  it('clickear una opcion de la pregunta 7 (checkbox) no rompe', () => {
    renderForm()
    const opt = screen.getByText(/Publico contenido en redes sociales/i)
    fireEvent.click(opt) // marcar
    fireEvent.click(opt) // desmarcar
    expect(opt).toBeTruthy()
  })
})
