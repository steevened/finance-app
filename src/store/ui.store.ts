import { Expense, Income } from '@/lib/types'
import { create } from 'zustand'



type UIState = {
    isIncomesDialogOpen: boolean
    isExpensesDialogOpen: boolean
    activeIncome: Income | undefined
    activeExpense: Expense | undefined
}

type UIActions = {
    setIncomesDialog: (value: boolean) => void
    setActiveIncome: (income: Income | undefined) => void
    setExpensesDialog: (value: boolean) => void

    setActiveExpense: (expense: Expense | undefined) => void

}

export const useUIStore = create<UIState & UIActions>()((set) => ({
    isIncomesDialogOpen: false,
    isExpensesDialogOpen: false,
    activeIncome: undefined,
    activeExpense: undefined,

    setIncomesDialog: (value) => set((state) => ({ isIncomesDialogOpen: value })),

    setActiveIncome: (income) => set(() => ({
        activeIncome: income
    })),

    setActiveExpense: (expense) => set(() => ({
        activeExpense: expense
    })),

    setExpensesDialog: (value) => set((state) => ({
        isExpensesDialogOpen: value
    }))
}))