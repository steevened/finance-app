import { getMyIncomes } from '@/lib/services/incomes.services'
import { Income } from '@/lib/types'
import { create } from 'zustand'



type UIState = {
    isIncomesDialogOpen: boolean
    activeIncome: Income | undefined
}

type UIActions = {
    setIncomesDialog: (value: boolean) => void
    setActiveIncome: (income: Income | undefined) => void

}

export const useUIStore = create<UIState & UIActions>()((set) => ({
    isIncomesDialogOpen: false,
    setIncomesDialog: (value) => set((state) => ({ isIncomesDialogOpen: value })),
    activeIncome: undefined,
    setActiveIncome: (income) => set(() => ({
        activeIncome: income
    }))
}))