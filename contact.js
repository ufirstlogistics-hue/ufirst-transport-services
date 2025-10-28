
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { name, email, phone, message } = req.body || {}
    if (!message || !email) return res.status(400).json({ error: 'Missing fields' })
    const msg = {
      to: process.env.TO_EMAIL || 'ufirstlogistics@icloud.com',
      from: process.env.FROM_EMAIL || 'no-reply@ufirsttransport.com',
      subject: `Website Contact: ${name || 'New message'}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\n${message}`,
    }
    await sendgrid.send(msg)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
