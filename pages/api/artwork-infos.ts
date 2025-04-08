import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { pt_id, mg_id } = req.body

        if (!pt_id || !mg_id) {
            return res.status(400).json({ message: 'All parameters are required.' });
        }
        const parentId = 'rec' + pt_id
        const imageId = 'rec' + mg_id

        const { orderId, format } = await getFormat({ parentId, imageId})
        let fm = format

        switch (format) {
            case 'Landscape Format (16:9)':
                fm = 'landscape'
                break
            case 'Portrait Format (9:16)':
                fm = 'portrait'
                break
            case 'Square Format (1:1)':
                fm = 'square'
                break
        }

        res.status(200).json({ orderId: orderId, format: fm})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const getOrderId = async (recordId) => {
    const airtableResponse = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_IS_TABLE_ID}/${recordId}`, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
    })
      
    const recordData = await airtableResponse.json()
    const fields = recordData.fields
    const orderId = fields['OrderID']

    return orderId
}

const getFormat = async (ids) => {
    const { parentId, imageId } = ids
    const airtableResponse = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_IG_TABLE_ID}/${imageId}`, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
    })
    
    let recordData = await airtableResponse.json()
    let fields = recordData.fields

    let tableId = ''
    let submission = ''
    let format = ''
    let orderId = ''

    if (fields['SubmissionID Initial'] && fields['SubmissionID Initial'].length > 0) {
        submission = fields['SubmissionID Initial'][0]
        tableId = `${process.env.AIRTABLE_IS_TABLE_ID}`
    } else if (fields['SubmissionID Retry New Form'] && fields['SubmissionID Retry New Form'].length > 0) {
        submission = fields['SubmissionID Retry New Form'][0]
        tableId = `${process.env.AIRTABLE_RN_TABLE_ID}`
    } else if (fields['SubmissionID Retry Improve'] && fields['SubmissionID Retry Improve'].length > 0) {
        submission = fields['SubmissionID Retry Improve'][0]
        tableId = `${process.env.AIRTABLE_RI_TABLE_ID}`
    }

    if (tableId && submission) {
        const airtableResponse2 = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableId}/${submission}`, {
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
            }
        })

        recordData = await airtableResponse2.json()
        fields = recordData.fields

        if (submission === parentId) {
            format = fields['Aspect Ratio']
            orderId = fields['OrderID']
            return { orderId, format}
        } else {
            orderId = await getOrderId(parentId)
            format = fields['Aspect Ratio']
            return { orderId, format}
        }
    }
    return { orderId, format}
}