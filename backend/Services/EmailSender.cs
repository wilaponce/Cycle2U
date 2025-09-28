using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Cycle2U.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var smtp = _config.GetSection("Smtp");
            var portValue = smtp["Port"];
            var fromAddress = smtp["From"];
            var host = smtp["Host"];
            var username = smtp["Username"];
            var password = smtp["Password"];

            int port = int.TryParse(portValue, out var parsedPort) ? parsedPort : 25;

            var client = new SmtpClient(host ?? "localhost", port)
            {
                Credentials = new NetworkCredential(username ?? string.Empty, password ?? string.Empty),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromAddress ?? throw new ArgumentNullException(nameof(fromAddress))),
                Subject = subject,
                Body = htmlMessage,
                IsBodyHtml = true
            };

            mailMessage.To.Add(email ?? throw new ArgumentNullException(nameof(email)));

            return client.SendMailAsync(mailMessage);
        }
    }
}
