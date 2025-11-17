import { ref } from 'vue'
import { defineStore } from 'pinia'

import BankService from '@/services/bankaccount.service.js'

export const useBankStore = defineStore('bank', () => {
    // state
    const currentAccount = ref(null)              // contient tout l'objet compte
    const accountAmount = ref(0)
    const accountTransactions = ref([])
    const accountNumberState = ref(0)

    //mutation
    const updateaccountNumberState = (data) =>{
        accountNumberState.value = data;
    }
    function setAccount(data) {
        currentAccount.value = data
    }

    function setTransactions(data) {
        accountTransactions.value = data
    }

    function setStatus(s) {
        accountNumberState.value = s
    }

    //action
    async function getAccountAmount(number) {
        let response = await BankService.getAccountAmount(number);
        if (response.error === 0) {
            accountAmount.value = response.data
            updateaccountNumberState(1);
        }
        else {
            console.error(response.data)
            updateaccountNumberState(-1)
        }
    }

    async function getTransactions(number) {
        let response = await BankService.getAllTransactions(number);

        if (response.error === 0) {
            accountTransactions.value = response.data
            updateaccountNumberState(1)



        }
        else {
            console.error(response.data)
            updateaccountNumberState(-1)
        }
    }


    async function createWithdraw(data) {
        const response = await BankService.createWithdrawService(data)

        if (response.error === 0) {
            currentAccount.value.amount = response.data.amount
            await getTransactions(data.idAccount)
            setStatus(1)
        } else {
            console.error(response.data)
            setStatus(-1)
        }
    }

    async function createPayment(data) {
        const response = await BankService.createPayment(data)

        if (response.error === 0) {
            currentAccount.value.amount = response.data.amount
            await getTransactions(data.idAccount)
            setStatus(1)
        } else {
            console.error(response.data)
            setStatus(-1)
        }
    }

    return { accountAmount,accountTransactions,accountNumberState, getAccountAmount,getTransactions,createPayment,createWithdraw}
})
