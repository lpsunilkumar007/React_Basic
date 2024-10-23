using Newtonsoft.Json.Linq;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CRUD.Service.Services
{
    public class EmailSender
    {
        public static void SendEmail(string senderEmail, string senderName, string receiverEmail, string receiverName, string subject, string message)
        {
            var apiInstance = new TransactionalEmailsApi();
            SendSmtpEmailSender sender = new SendSmtpEmailSender(senderName, senderEmail);
            SendSmtpEmailTo receiver1 = new SendSmtpEmailTo(receiverEmail, receiverName);
            List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo> { receiver1 };

            // Provide a valid HTML content
            string HtmlContent = "<html><body><p>" + message + "</p></body></html>"; // Adjust as needed
            string TextContent = message;

            try
            {
                var sendSmtpEmail = new SendSmtpEmail(sender, To, null, null, HtmlContent, TextContent, subject);
                CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);

                Console.WriteLine("Brevo Response: " + result.ToJson());
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception occurred: " + e.ToString()); // More detailed error output
            }
        }

    }
}
