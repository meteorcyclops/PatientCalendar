const eventConstentList = {
    '預約門診':[
        { label: '姓名', column: 'patName' },
        { label: '預訂門診時間', column: 'date' },
        { label: '門診醫師', column: 'DOC_NAME' },
        { label: '診斷', column: 'diagnosis' },
        { label: '註記', column: 'NOTE' }
    ],
    '預約住院':[
        { label: '姓名', column: 'patName' },
        { label: '預訂入住時間', column: 'date' },
        { label: '主責醫師', column: 'requestUser' },
        { label: '診斷', column: 'diagnosis' },
        { label: '住院原因', column: 'reasons' }
    ],
    '預約健檢':[
        { label: '預訂檢查時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser' },
        { label: '檢查項目', column: 'EXAMCNAME' }
    ],
    '預約手術':[
        { label: '預訂檢查時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser' },
        { label: '檢查項目', column: 'EXAMCNAME' }
    ],
    '預約排檢':[
        { label: '姓名', column: 'patName' },
        { label: '預訂檢查時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser' },
        { label: '檢查項目', column: 'EXAMCNAME' }
    ],
    '預約排檢(內視鏡)':[
        { label: '姓名', column: 'patName' },
        { label: '預訂時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser' },
        { label: '檢查項目', column: 'ITM_NAME' }
    ],
}

export default eventConstentList