const eventConstentList = {
    '預約門診':[
        { label: '姓名', column: 'patName' },
        { label: '報到時間', column: 'NOTE' },
        { label: '門診醫師', column: 'DOC_NAME' },
        { label: '診區', column: 'AREA_NAME' },
        // { label: '上次診斷', column: 'diagnosis' },
        // { label: '預約', column: 'NOTE' },
    ].concat( PRODUCTION_TYPE !== 'pp'? [] : [
        { label: '備註', column: 'MEMO' }
    ]),
    '預約住院':[
        { label: '姓名', column: 'patName' },
        { label: '入住時間', column: 'date' },
        { label: '醫師', column: 'docs' },
        // { label: '診斷', column: 'diagnosis' },
        { label: '住院原因', column: 'reasons' }
    ],
    '預約健檢':[
        { label: '預訂時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser.name' },
        { label: '檢查項目', column: 'EXAMCNAME' }
    ],
    '預約手術':[
        { label: '預訂時間', column: 'date' },
        { label: '術前診斷', column: 'diagnosis' },
        { label: '手術醫師', column: 'docs' },
        { label: '麻醉方式', column: 'ANESTIC' },
        { label: '預訂手術法', column: 'beforeOprs' }
    ],
    '預約排檢':[
        { label: '姓名', column: 'patName' },
        { label: '預訂時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser.name' },
        { label: '檢查項目', column: 'EXAMCNAME' }
    ],
    '預約排檢(內視鏡)':[
        { label: '姓名', column: 'patName' },
        { label: '預訂時間', column: 'date' },
        { label: '預約醫師', column: 'requestUser.name' },
        { label: '檢查項目', column: 'ITM_NAME' }
    ],
    '預約放腫':[
        { label: '姓名', column: 'patName' },
        { label: '預訂時間', column: 'date' },
        { label: '醫師', column: 'DocName' },
        { label: '項目', column: 'ActivityNote' },
        { label: '註記', column: 'ShortComment' },
        { label: '狀態', column: 'ScheduledActivityCode' }
    ],
}

export default eventConstentList