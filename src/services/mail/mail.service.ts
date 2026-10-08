// import { MailerService } from '@nestjs-modules/mailer';
// import { Injectable } from '@nestjs/common';

// import { IServiceData, ServiceError } from '@/shared/interfaces';
// import { PrismaService } from '@/prisma/prisma.service';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class MailService {
// 	constructor(
// 		private mailerService: MailerService,
// 		private prisma: PrismaService,
// 		private config: ConfigService
// 	) {}

// 	async sendUserCredentialsToAdmin(
// 		adminEmail: string,
// 		userEmail: string,
// 		password: string,
// 		loginUrl: string
// 	) {
// 		try {
// 			const userDetail = await this.prisma.party.findFirst({
// 				where: {
// 					email: adminEmail
// 				},
// 				select: {
// 					firstName: true,
// 					lastName: true,
// 					email: true,
// 					username: true
// 				}
// 			});

// 			if (!userDetail) {
// 				return { data: 'User not found!!' } as IServiceData;
// 			}

// 			await this.mailerService.sendMail({
// 				to: adminEmail,
// 				subject: 'Welcome to sysonex, Here are your newly created users credentials',
// 				html: `<html>

// 				<head>
// 					<style>
// 						@media only screen and (max-width: 620px) {
// 							/* Add your responsive styles here */
// 						}
				
// 						@media all {
// 							/* Add your global styles here */
// 						}
				
// 						/* Updated color scheme for a more professional look */
// 						body {
// 							background-color: #f9f9f9;
// 							font-family: 'Arial', sans-serif;
// 							-webkit-font-smoothing: antialiased;
// 							font-size: 14px;
// 							line-height: 1.4;
// 							margin: 0;
// 							padding: 0;
// 							-ms-text-size-adjust: 100%;
// 							-webkit-text-size-adjust: 100%;
// 						}
				
// 						.container {
// 							max-width: 580px;
// 							margin: 0 auto;
// 						}
				
// 						.header {
// 							background-color: #3498db;
// 							padding: 20px;
// 							text-align: center;
// 						}
				
// 						.header img {
// 							max-width: 120px;
// 							height: auto;
// 						}
				
// 						.content {
// 							box-sizing: border-box;
// 							padding: 20px;
// 							background-color: #ffffff;
// 							border-radius: 3px;
// 							margin-top: 20px;
// 						}
				
// 						.credentials {
// 							background-color: #3498db;
// 							border-radius: 5px;
// 							text-align: center;
// 							padding: 15px;
// 							color: #ffffff;
// 						}
				
// 						.credentials p {
// 							margin: 0;
// 							font-size: 14px;
// 						}
				
// 						.footer {
// 							clear: both;
// 							margin-top: 20px;
// 							text-align: center;
// 							padding: 10px;
// 							color: #999999;
// 							font-size: 12px;
// 						}
// 					</style>
// 				</head>
				
// 				<body>
// 					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9; width: 100%;" width="100%" bgcolor="#f9f9f9">
// 						<tr>
// 							<td style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
// 							<td class="container" style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; margin: 0 auto; padding: 0 10px;" width="580" valign="top">
// 								<div class="header" style="background-color: #333787; padding: 20px; text-align: center;">
// 									<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/sysonex-logo.png" alt="logo" border="0" style="max-width: 120px; height: auto;">
// 								</div>
				
// 								<div class="content" style="box-sizing: border-box; padding: 20px; background-color: #ffffff; border-radius: 3px; margin-top: 20px;">
// 									<p style="font-family: 'Arial', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
// 										Dear ${userDetail.firstName},
// 									</p>
// 									<p style="font-family: 'Arial', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
// 									We are delighted to welcome you to SysRisk platform from Sysonex. Your temporary password has been securely generated for your account. Please log in at your earliest convenience and consider updating your password for added security.
// 									</p>
// 									<div class="credentials" style="background-color: #333787; border-radius: 5px; text-align: center; padding: 15px; color: #ffffff;">
// 										<p style="font-style: italic;margin-bottom:2px;color:white">For your convenience, here are your login credentials:</p>
// 										<p style="font-style: italic;margin-bottom:2px;color:yellow">Email: ${userEmail}</p>
// 										<p style="font-style: italic;margin-bottom:2px;color:yellow">Password: ${[password]}</p>
// 										<p style="font-style: italic;margin-bottom:2px;color:yellow">Login URL: ${loginUrl}</p>
// 									</div>
// 									<p style="font-family: 'Arial', sans-serif; font-size: 14px; font-weight: normal; margin: 15px 0;">
// 									Thank you for choosing SysRisk as your risk management platform. We look forward to working with you in the days to come.
// 									</p>
// 									<br />
					   
// 								</div>
				
// 								<div class="footer" style="clear: both; margin-top: 20px; text-align: center; padding: 10px; color: #999999; font-size: 12px;">
// 									Regards,<br> sysonex.net<br> support@sysonex.dev
// 								</div>
// 							</td>
// 							<td style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
// 						</tr>
// 					</table>
// 				</body>
				
// 				</html>`
// 			});

// 			return { data: 'email sent' } as IServiceData;
// 		} catch (e) {
// 			console.error(e);
// 			return {
// 				businessError: {
// 					type: ServiceError.BAD_REQUEST,
// 					message: 'error while sending email'
// 				}
// 			} as IServiceData;
// 		}
// 	}

// 	async sendUserCredentials(userEmail: string, password: string, loginUrl: string) {
// 		try {
// 			const userDetail = await this.prisma.party.findFirst({
// 				where: {
// 					email: userEmail
// 				},
// 				select: {
// 					firstName: true,
// 					lastName: true,
// 					email: true,
// 					username: true
// 				}
// 			});

// 			if (!userDetail) {
// 				return { data: 'User not found!!' } as IServiceData;
// 			}

// 			await this.mailerService.sendMail({
// 				to: userEmail,
// 				subject: 'Welcome to sysonex, Here are your credentials',
// 				html: `<!doctype html>
// 				<html lang="en">
// 				  <head>
// 					<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
// 					<title>Simple Transactional Email</title>
// 					<style media="all" type="text/css">
// 					/* -------------------------------------
// 					GLOBAL RESETS
// 				------------------------------------- */
					
// 					body {
// 					  font-family: Helvetica, sans-serif;
// 					  -webkit-font-smoothing: antialiased;
// 					  font-size: 16px;
// 					  line-height: 1.3;
// 					  -ms-text-size-adjust: 100%;
// 					  -webkit-text-size-adjust: 100%;
// 					}
					
// 					table {
// 					  border-collapse: separate;
// 					  mso-table-lspace: 0pt;
// 					  mso-table-rspace: 0pt;
// 					  width: 100%;
// 					}
					
// 					table td {
// 					  font-family: Helvetica, sans-serif;
// 					  font-size: 16px;
// 					  vertical-align: top;
// 					}
				
// 					.data-table {
// 					  border-collapse: collapse;
// 					  border-color: #D8D9DA;
// 					  margin-bottom: 38px;
// 					}
				
// 					.data-table td {
// 					  padding: 12px;
// 					}
				
// 					.data-table tr td:first-child {
// 					  color: #228BE6;
// 					  font-weight: 500;
// 					}
					
// 					.data-table tr td:last-child {
// 					  width: 62%;
// 					  color: rgb(112, 111, 111);
// 					}
				
// 					/* -------------------------------------
// 					BODY & CONTAINER
// 				------------------------------------- */
					
// 					body {
// 					  background-color: #f4f5f6;
// 					  margin: 0;
// 					  padding: 0;
// 					}
					
// 					.body {
// 					  background-color: #f4f5f6;
// 					  width: 100%;
// 					}
				
// 					.header {
// 						height: 64px;
// 						background-color: #333787;
// 						margin-bottom: 8px;
// 						border-top-left-radius: 16px;
// 						border-top-right-radius: 16px;
// 					}
				
// 					.sysonex-logo img {
// 						width: 98px;
// 						margin-top: 12px;
// 						margin-left: 21px;
// 					}
					
// 					.container {
// 					  margin: 0 auto !important;
// 					  max-width: 600px;
// 					  padding: 0;
// 					  padding-top: 24px;
// 					  width: 600px;
// 					}
					
// 					.content {
// 					  box-sizing: border-box;
// 					  display: block;
// 					  margin: 0 auto;
// 					  max-width: 600px;
// 					  padding: 0;
// 					}
// 					/* -------------------------------------
// 					HEADER, FOOTER, MAIN
// 				------------------------------------- */
					
// 					.main {
// 					  background: #ffffff;
// 					  border: 1px solid #eaebed;
// 					  border-radius: 16px;
// 					  width: 100%;
// 					}
					
// 					.wrapper {
// 					  box-sizing: border-box;
// 					}
					
// 					.wrapper-content {
// 					  box-sizing: border-box;
// 					  padding: 24px;
// 					}
				
// 					.support-email {
// 					  color: #228BE6;
// 					  margin-top: 5px;
// 					}
				
// 					.social-icons {
// 					  width: auto;
// 					}
				
// 					.social-icons td {
// 					  padding-right: 10px;
// 					}
					
// 					.footer {
// 					  clear: both;
// 					  padding-top: 24px;
// 					  padding-bottom: 32px;
// 					  text-align: center;
// 					  width: 100%;
// 					}
					
// 					.footer td,
// 					.footer p,
// 					.footer span,
// 					.footer a {
// 					  color: #9a9ea6;
// 					  font-size: 16px;
// 					  text-align: center;
// 					}
// 					/* -------------------------------------
// 					TYPOGRAPHY
// 				------------------------------------- */
					
// 					p {
// 					  font-family: Helvetica, sans-serif;
// 					  font-size: 16px;
// 					  font-weight: normal;
// 					  margin: 0;
// 					  margin-bottom: 16px;
// 					}
					
// 					a {
// 					  color: #0867ec;
// 					  text-decoration: underline;
// 					}
// 					/* -------------------------------------
// 					BUTTONS
// 				------------------------------------- */
					
// 					.btn {
// 					  box-sizing: border-box;
// 					  min-width: 100% !important;
// 					  width: 100%;
// 					}
					
// 					.btn > tbody > tr > td {
// 					  padding-bottom: 16px;
// 					}
					
// 					.btn table {
// 					  width: auto;
// 					}
					
// 					.btn table td {
// 					  background-color: #ffffff;
// 					  border-radius: 4px;
// 					  text-align: center;
// 					}
					
// 					.btn a {
// 					  background-color: #ffffff;
// 					  border: solid 2px #0867ec;
// 					  border-radius: 4px;
// 					  box-sizing: border-box;
// 					  color: #0867ec;
// 					  cursor: pointer;
// 					  display: inline-block;
// 					  font-size: 16px;
// 					  font-weight: bold;
// 					  margin: 0;
// 					  padding: 12px 24px;
// 					  text-decoration: none;
// 					  text-transform: capitalize;
// 					}
					
// 					.btn-primary table td {
// 					  background-color: #0867ec;
// 					}
					
// 					.btn-primary a {
// 					  background-color: #0867ec;
// 					  border-color: #0867ec;
// 					  color: #ffffff;
// 					}
					
// 					@media all {
// 					  .btn-primary table td:hover {
// 						background-color: #ec0867 !important;
// 					  }
// 					  .btn-primary a:hover {
// 						background-color: #ec0867 !important;
// 						border-color: #ec0867 !important;
// 					  }
// 					}
					
// 					/* -------------------------------------
// 					OTHER STYLES THAT MIGHT BE USEFUL
// 				------------------------------------- */
					
// 					.last {
// 					  margin-bottom: 0;
// 					}
					
// 					.first {
// 					  margin-top: 0;
// 					}
					
// 					.align-center {
// 					  text-align: center;
// 					}
					
// 					.align-right {
// 					  text-align: right;
// 					}
					
// 					.align-left {
// 					  text-align: left;
// 					}
					
// 					.text-link {
// 					  color: #0867ec !important;
// 					  text-decoration: underline !important;
// 					}
					
// 					.clear {
// 					  clear: both;
// 					}
					
// 					.mt0 {
// 					  margin-top: 0;
// 					}
					
// 					.mb0 {
// 					  margin-bottom: 0;
// 					}
					
// 					.preheader {
// 					  color: transparent;
// 					  display: none;
// 					  height: 0;
// 					  max-height: 0;
// 					  max-width: 0;
// 					  opacity: 0;
// 					  overflow: hidden;
// 					  mso-hide: all;
// 					  visibility: hidden;
// 					  width: 0;
// 					}
					
// 					.powered-by a {
// 					  text-decoration: none;
// 					}
					
// 					/* -------------------------------------
// 					RESPONSIVE AND MOBILE FRIENDLY STYLES
// 				------------------------------------- */
					
// 					@media only screen and (max-width: 640px) {
// 					  .header {
// 						border-top-left-radius: 0 !important;
// 						border-top-right-radius: 0 !important;
// 					  }
// 					  .main p,
// 					  .main td,
// 					  .main span {
// 						font-size: 16px !important;
// 					  }
// 					  .wrapper {
// 						padding: 8px !important;
// 					  }
// 					  .content {
// 						padding: 0 !important;
// 					  }
// 					  .container {
// 						padding: 0 !important;
// 						padding-top: 8px !important;
// 						width: 100% !important;
// 					  }
// 					  .main {
// 						border-left-width: 0 !important;
// 						border-radius: 0 !important;
// 						border-right-width: 0 !important;
// 					  }
// 					  .btn table {
// 						max-width: 100% !important;
// 						width: 100% !important;
// 					  }
// 					  .btn a {
// 						font-size: 16px !important;
// 						max-width: 100% !important;
// 						width: 100% !important;
// 					  }
// 					}
// 					/* -------------------------------------
// 					PRESERVE THESE STYLES IN THE HEAD
// 				------------------------------------- */
					
// 					@media all {
// 					  .ExternalClass {
// 						width: 100%;
// 					  }
// 					  .ExternalClass,
// 					  .ExternalClass p,
// 					  .ExternalClass span,
// 					  .ExternalClass font,
// 					  .ExternalClass td,
// 					  .ExternalClass div {
// 						line-height: 100%;
// 					  }
// 					  .apple-link a {
// 						color: inherit !important;
// 						font-family: inherit !important;
// 						font-size: inherit !important;
// 						font-weight: inherit !important;
// 						line-height: inherit !important;
// 						text-decoration: none !important;
// 					  }
// 					  #MessageViewBody a {
// 						color: inherit;
// 						text-decoration: none;
// 						font-size: inherit;
// 						font-family: inherit;
// 						font-weight: inherit;
// 						line-height: inherit;
// 					  }
// 					}
// 					</style>
// 				  </head>
// 				  <body>
// 					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
// 					  <tr>
// 						<td>&nbsp;</td>
// 						<td class="container">
// 						  <div class="content">
				
// 							<!-- START CENTERED WHITE CONTAINER -->
// 							<span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
// 							<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
				
// 							  <!-- START MAIN CONTENT AREA -->
// 							  <tr>
// 								<td>
// 								  <table class="header">
// 									<tr>
// 										<td class="sysonex-logo">
// 											<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/sysonex-logo.png" alt="">
// 										</td>
// 									</tr>
// 								  </table>
// 								</td>
// 							  </tr>
				
// 							  <tr>
// 								<td class="wrapper-content">
// 								  <p>Dear ${userDetail.firstName},</p>
// 								  <p>Wishing you a warm welcome to the Sysonex family.
// 									Please login using the link provided.</p>
// 									<br>
// 									<p>Your Details</p>
// 										  <table border="1" class="data-table">
// 											  <tr>
// 												<td>Full Name</td>
// 												<td>${userDetail.firstName} ${userDetail.lastName}</td>
// 											  </tr>
											
// 											  <tr>
// 												<td>Login Link</td>
// 												 <td><a href="${loginUrl}" target="_blank" rel="noopener noreferrer">${loginUrl}</a></td>
// 											  </tr>
// 											  <tr>
// 												<td>Main/Root Email Address</td>
// 												<td>${userDetail.email}</td>
// 											  </tr>
											  
// 											  <tr>
// 												<td>Password</td>
// 												<td>${password}</td>
// 											  </tr>
// 										  </table>
// 								  <p>Thank you very much. Looking forward to helping you in future.</p>
// 								  <p>Contact us anytime.</p>
				
// 								  <table class="social-icons">
// 									<tr>
// 										<td class="social-icon">
// 											<a href="https://www.facebook.com/sysonex" target="_blank">
// 												<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/Facebook_Icon.png" alt="Facebook">
// 											</a>
// 										</td>
// 										<td class="social-icon">
// 											<a href="https://www.linkedin.com/company/sysonex/" target="_blank">
// 												<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/Linkedin_Icon.png" alt="LinkedIn">
// 											</a>
// 										</td>
// 										<td class="social-icon">
// 											<a href="https://www.youtube.com/@sysonexinc" target="_blank">
// 												<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/Youtube_Icon.png" alt="YouTube">
// 											</a>
// 										</td>
// 									</tr>
// 								</table>
				
// 								  <p class="support-email">support@sysonex.dev</p>
// 								</td>
// 							  </tr>
				
// 							  <!-- END MAIN CONTENT AREA -->
// 							  </table>
				
// 							<!-- START FOOTER -->
// 							<div class="footer">
// 							  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
// 								<tr>
// 								  <td class="content-block">
// 									<span class="apple-link">Regards,</span>
// 									<br><a href="https://sysonex.com/" target="_blank" style="color: #228BE6;">sysonex.com</a>
// 								  </td>
// 								</tr>
// 							  </table>
// 							</div>
				
// 							<!-- END FOOTER -->
							
// 				<!-- END CENTERED WHITE CONTAINER --></div>
// 						</td>
// 						<td>&nbsp;</td>
// 					  </tr>
// 					</table>
// 				  </body>
// 				</html>`
// 			});

// 			return { data: 'email sent' } as IServiceData;
// 		} catch (e) {
// 			console.error(e);
// 			return {
// 				businessError: {
// 					type: ServiceError.BAD_REQUEST,
// 					message: 'error while sending email'
// 				}
// 			} as IServiceData;
// 		}
// 	}

// 	async sendUserAddRequestEmail() {
// 		try {
// 			const customerId = this.config.get('CUSTOMER_ID'); // from .env
// 			const subscriptionId = this.config.get('SUBSCRIPTION_ID'); // from .env

// 			const mailOptions = {
// 				to: 'jmondol@gmail.com',
// 				subject: 'Request to Add New User',
// 				html: `<!doctype html>
//       <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>User Addition Request</title>
//           <style>
//             body { font-family: Helvetica, sans-serif; background-color: #f4f5f6; margin: 0; padding: 0; }
//             .container { max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 16px; border: 1px solid #eaebed; }
//             h1 { color: #333787; }
//             p { color: #333; font-size: 16px; }
//             .btn { display: inline-block; padding: 12px 24px; margin-top: 16px; text-decoration: none; color: #ffffff; background-color: #0867ec; border-radius: 4px; font-weight: bold; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>User Addition Request</h1>
//             <p>Dear J. Mondol,</p>
//             <p>All available user seats in the current subscription have been used.</p>
//             <p><strong>Customer ID:</strong> ${customerId}</p>
//             <p><strong>Subscription ID:</strong> ${subscriptionId}</p>
//             <p>Please approve adding more users to the subscription so new users can be created.</p>
//             <p>Thank you!</p>
//             <a href="mailto:jmondol@gmail.com" class="btn">Contact Admin</a>
//           </div>
//         </body>
//       </html>`
// 			};

// 			await this.mailerService.sendMail(mailOptions);
// 			console.log('Request email sent to jmondol@gmail.com');
// 		} catch (e) {
// 			console.error('Error sending user add request email:', e);
// 		}
// 	}

// 	async sendUserNotification(username: string, subject: string, message: string, riskItem: any) {
// 		try {
// 			const userDetail = await this.prisma.party.findFirst({
// 				where: {
// 					username: username
// 				},
// 				select: {
// 					firstName: true,
// 					lastName: true,
// 					email: true,
// 					username: true
// 				}
// 			});

// 			if (!userDetail) {
// 				return { data: 'User not found!!' } as IServiceData;
// 			}

// 			const product = await this.prisma.product.findFirst({
// 				where: {
// 					originalId: riskItem.productId
// 				},
// 				select: {
// 					name: true
// 				}
// 			});

// 			console.log(riskItem.monitoredBy, 'dfghffffffffff');

// 			const monitorBy = Array.isArray(riskItem.monitoredBy)
// 				? riskItem.monitoredBy.map((item: any) => item.monitorUsername).join(',')
// 				: '';

// 			console.log(monitorBy, 'monitorBy...');

// 			const category = await this.prisma.category.findFirst({
// 				where: {
// 					originalId: riskItem.categoryId
// 				},
// 				select: {
// 					name: true
// 				}
// 			});
// 			const formattedDate = new Date(riskItem.createdAt).toLocaleString('en-US', {
// 				year: 'numeric',
// 				month: 'short',
// 				day: '2-digit',
// 				hour: '2-digit',
// 				minute: '2-digit',
// 				second: '2-digit',
// 				hour12: true
// 			});

// 			await this.mailerService.sendMail({
// 				to: userDetail.email,
// 				subject: subject,
// 				html: `<!doctype html>
// 				<html lang="en">
// 				  <head>
// 					<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
// 					<title>Simple Transactional Email</title>
// 					<style media="all" type="text/css">
// 					/* -------------------------------------
// 					GLOBAL RESETS
// 				------------------------------------- */
					
// 					body {
// 					  font-family: Helvetica, sans-serif;
// 					  -webkit-font-smoothing: antialiased;
// 					  font-size: 16px;
// 					  line-height: 1.3;
// 					  -ms-text-size-adjust: 100%;
// 					  -webkit-text-size-adjust: 100%;
// 					}
					
// 					table {
// 					  border-collapse: separate;
// 					  mso-table-lspace: 0pt;
// 					  mso-table-rspace: 0pt;
// 					  width: 100%;
// 					}
					
// 					table td {
// 					  font-family: Helvetica, sans-serif;
// 					  font-size: 16px;
// 					  vertical-align: top;
// 					}
				
// 					.data-table {
// 					  border-collapse: collapse;
// 					  border-color: #D8D9DA;
// 					  margin-bottom: 38px;
// 					}
				
// 					.data-table td {
// 					  padding: 12px;
// 					}
				
// 					.data-table tr td:first-child {
// 					  color: #228BE6;
// 					  font-weight: 500;
// 					}
					
// 					.data-table tr td:last-child {
// 					  width: 62%;
// 					  color: rgb(112, 111, 111);
// 					}
				
// 					/* -------------------------------------
// 					BODY & CONTAINER
// 				------------------------------------- */
					
// 					body {
// 					  background-color: #f4f5f6;
// 					  margin: 0;
// 					  padding: 0;
// 					}
					
// 					.body {
// 					  background-color: #f4f5f6;
// 					  width: 100%;
// 					}
				
// 					.header {
// 						height: 64px;
// 						background-color: #333787;
// 						margin-bottom: 8px;
// 						border-top-left-radius: 16px;
// 						border-top-right-radius: 16px;
// 					}
				
// 					.sysonex-logo img {
// 						width: 98px;
// 						margin-top: 12px;
// 						margin-left: 21px;
// 					}
					
// 					.container {
// 					  margin: 0 auto !important;
// 					  max-width: 600px;
// 					  padding: 0;
// 					  padding-top: 24px;
// 					  width: 600px;
// 					}
					
// 					.content {
// 					  box-sizing: border-box;
// 					  display: block;
// 					  margin: 0 auto;
// 					  max-width: 600px;
// 					  padding: 0;
// 					}
// 					/* -------------------------------------
// 					HEADER, FOOTER, MAIN
// 				------------------------------------- */
					
// 					.main {
// 					  background: #ffffff;
// 					  border: 1px solid #eaebed;
// 					  border-radius: 16px;
// 					  width: 100%;
// 					}
					
// 					.wrapper {
// 					  box-sizing: border-box;
// 					}
					
// 					.wrapper-content {
// 					  box-sizing: border-box;
// 					  padding: 24px;
// 					}
				
// 					.support-email {
// 					  color: #228BE6;
// 					  margin-top: 5px;
// 					}
				
// 					.social-icons {
// 					  width: auto;
// 					}
				
// 					.social-icons td {
// 					  padding-right: 10px;
// 					}
					
// 					.footer {
// 					  clear: both;
// 					  padding-top: 24px;
// 					  padding-bottom: 32px;
// 					  text-align: center;
// 					  width: 100%;
// 					}
					
// 					.footer td,
// 					.footer p,
// 					.footer span,
// 					.footer a {
// 					  color: #9a9ea6;
// 					  font-size: 16px;
// 					  text-align: center;
// 					}
// 					/* -------------------------------------
// 					TYPOGRAPHY
// 				------------------------------------- */
					
// 					p {
// 					  font-family: Helvetica, sans-serif;
// 					  font-size: 16px;
// 					  font-weight: normal;
// 					  margin: 0;
// 					  margin-bottom: 16px;
// 					}
					
// 					a {
// 					  color: #0867ec;
// 					  text-decoration: underline;
// 					}
// 					/* -------------------------------------
// 					BUTTONS
// 				------------------------------------- */
					
// 					.btn {
// 					  box-sizing: border-box;
// 					  min-width: 100% !important;
// 					  width: 100%;
// 					}
					
// 					.btn > tbody > tr > td {
// 					  padding-bottom: 16px;
// 					}
					
// 					.btn table {
// 					  width: auto;
// 					}
					
// 					.btn table td {
// 					  background-color: #ffffff;
// 					  border-radius: 4px;
// 					  text-align: center;
// 					}
					
// 					.btn a {
// 					  background-color: #ffffff;
// 					  border: solid 2px #0867ec;
// 					  border-radius: 4px;
// 					  box-sizing: border-box;
// 					  color: #0867ec;
// 					  cursor: pointer;
// 					  display: inline-block;
// 					  font-size: 16px;
// 					  font-weight: bold;
// 					  margin: 0;
// 					  padding: 12px 24px;
// 					  text-decoration: none;
// 					  text-transform: capitalize;
// 					}
					
// 					.btn-primary table td {
// 					  background-color: #0867ec;
// 					}
					
// 					.btn-primary a {
// 					  background-color: #0867ec;
// 					  border-color: #0867ec;
// 					  color: #ffffff;
// 					}
					
// 					@media all {
// 					  .btn-primary table td:hover {
// 						background-color: #ec0867 !important;
// 					  }
// 					  .btn-primary a:hover {
// 						background-color: #ec0867 !important;
// 						border-color: #ec0867 !important;
// 					  }
// 					}
					
// 					/* -------------------------------------
// 					OTHER STYLES THAT MIGHT BE USEFUL
// 				------------------------------------- */
					
// 					.last {
// 					  margin-bottom: 0;
// 					}
					
// 					.first {
// 					  margin-top: 0;
// 					}
					
// 					.align-center {
// 					  text-align: center;
// 					}
					
// 					.align-right {
// 					  text-align: right;
// 					}
					
// 					.align-left {
// 					  text-align: left;
// 					}
					
// 					.text-link {
// 					  color: #0867ec !important;
// 					  text-decoration: underline !important;
// 					}
					
// 					.clear {
// 					  clear: both;
// 					}
					
// 					.mt0 {
// 					  margin-top: 0;
// 					}
					
// 					.mb0 {
// 					  margin-bottom: 0;
// 					}
					
// 					.preheader {
// 					  color: transparent;
// 					  display: none;
// 					  height: 0;
// 					  max-height: 0;
// 					  max-width: 0;
// 					  opacity: 0;
// 					  overflow: hidden;
// 					  mso-hide: all;
// 					  visibility: hidden;
// 					  width: 0;
// 					}
					
// 					.powered-by a {
// 					  text-decoration: none;
// 					}
					
// 					/* -------------------------------------
// 					RESPONSIVE AND MOBILE FRIENDLY STYLES
// 				------------------------------------- */
					
// 					@media only screen and (max-width: 640px) {
// 					  .header {
// 						border-top-left-radius: 0 !important;
// 						border-top-right-radius: 0 !important;
// 					  }
// 					  .main p,
// 					  .main td,
// 					  .main span {
// 						font-size: 16px !important;
// 					  }
// 					  .wrapper {
// 						padding: 8px !important;
// 					  }
// 					  .content {
// 						padding: 0 !important;
// 					  }
// 					  .container {
// 						padding: 0 !important;
// 						padding-top: 8px !important;
// 						width: 100% !important;
// 					  }
// 					  .main {
// 						border-left-width: 0 !important;
// 						border-radius: 0 !important;
// 						border-right-width: 0 !important;
// 					  }
// 					  .btn table {
// 						max-width: 100% !important;
// 						width: 100% !important;
// 					  }
// 					  .btn a {
// 						font-size: 16px !important;
// 						max-width: 100% !important;
// 						width: 100% !important;
// 					  }
// 					}
// 					/* -------------------------------------
// 					PRESERVE THESE STYLES IN THE HEAD
// 				------------------------------------- */
					
// 					@media all {
// 					  .ExternalClass {
// 						width: 100%;
// 					  }
// 					  .ExternalClass,
// 					  .ExternalClass p,
// 					  .ExternalClass span,
// 					  .ExternalClass font,
// 					  .ExternalClass td,
// 					  .ExternalClass div {
// 						line-height: 100%;
// 					  }
// 					  .apple-link a {
// 						color: inherit !important;
// 						font-family: inherit !important;
// 						font-size: inherit !important;
// 						font-weight: inherit !important;
// 						line-height: inherit !important;
// 						text-decoration: none !important;
// 					  }
// 					  #MessageViewBody a {
// 						color: inherit;
// 						text-decoration: none;
// 						font-size: inherit;
// 						font-family: inherit;
// 						font-weight: inherit;
// 						line-height: inherit;
// 					  }
// 					}
// 					</style>
// 				  </head>
// 				  <body>
// 					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
// 					  <tr>
// 						<td>&nbsp;</td>
// 						<td class="container">
// 						  <div class="content">
				
// 							<!-- START CENTERED WHITE CONTAINER -->
// 							<span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
// 							<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
				
// 							  <!-- START MAIN CONTENT AREA -->
// 							  <tr>
// 								<td>
// 								  <table class="header">
// 									<tr>
// 										<td class="sysonex-logo">
// 											<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/sysonex-logo.png" alt="">
// 										</td>
// 									</tr>
// 								  </table>
// 								</td>
// 							  </tr>
				
// 							  <tr>
// 								<td class="wrapper-content">
// 								  <p>${message}</p>
// 									<br>
// 									<p>Your Details</p>
// 										  <table border="1" class="data-table">
// 										  <tr>
// 										  <td>Product</td>
// 										  <td>${product.name ? product.name : 'N/A'}</td>
// 										</tr>
// 										  <tr>
// 										  <td>Risk Category</td>
// 										  <td>${category?.name ? category.name : 'N/A'}</td>
// 										</tr>
// 											  <tr>
// 												<td>Title</td>
// 												<td>${riskItem.title} </td>
// 											  </tr>
// 											  <tr>
// 												<td>Description</td>
// 												<td>${riskItem.description}</td>
// 											  </tr>
// 											  <tr>
// 												<td>Resolution</td>
// 												<td>${riskItem.riskResolution}</td>
// 											  </tr>
// 											  <tr>
// 												<td>likelihood</td>
// 												<td>${riskItem.likelihood} : ${riskItem.likelihoodScore}</td>
// 											  </tr>
// 											  <tr>
// 											  <td>Impact</td>
// 											  <td>${riskItem.impact} : ${riskItem.impactScore}</td>
// 											</tr>
// 											<tr>
// 											<td>Potential Damage Cost</td>
// 											<td>${riskItem.potentialDamageCost}</td>
// 										  </tr>
// 										  <tr>
// 										  <td>Mitigation Cost</td>
// 										  <td>${riskItem.mitigationCost}</td>
// 										</tr>
// 										<tr>
// 										<td>Approval Status</td>
// 										<td>${riskItem.approvalStatus}</td>
// 									  </tr>
// 									  <tr>
// 									  <td>Owner</td>
// 									  <td>${riskItem.ownerUsername}</td>
// 									</tr>
// 									<tr>
// 									<td>Assign</td>
// 									<td>${riskItem.assignUsername}</td>
// 								  </tr>
// 								  <tr>
// 								  <td>	Created</td>
// 								  <td>${riskItem.createdByUsername}</td>
// 								</tr>

// 											  <tr>
// 												<td>Monitors</td>
// 												<td>${
// 													Array.isArray(riskItem.monitoredBy)
// 														? riskItem.monitoredBy
// 																.map((item: any) => item.monitorUsername)
// 																.join(',')
// 														: ''
// 												}</td>

// 											  </tr>
// 											  <tr>
// 												<td>Created At</td>
// 												<td>${formattedDate}</td>
// 											  </tr>
// 										  </table>
// 								  <p>Thank you very much. Looking forward to helping you in future.</p>
// 								  <p>Contact us anytime.</p>
				
// 								  <table class="social-icons">
// 									<tr>
// 										<td class="social-icon">
// 											<a href="https://www.facebook.com/sysonex" target="_blank">
// 												<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/Facebook_Icon.png" alt="Facebook">
// 											</a>
// 										</td>
// 										<td class="social-icon">
// 											<a href="https://www.linkedin.com/company/sysonex/" target="_blank">
// 												<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/Linkedin_Icon.png" alt="LinkedIn">
// 											</a>
// 										</td>
// 										<td class="social-icon">
// 											<a href="https://www.youtube.com/@sysonexinc" target="_blank">
// 												<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/Youtube_Icon.png" alt="YouTube">
// 											</a>
// 										</td>
// 									</tr>
// 								</table>
				
// 								  <p class="support-email">support@sysonex.dev</p>
// 								</td>
// 							  </tr>
				
// 							  <!-- END MAIN CONTENT AREA -->
// 							  </table>
				
// 							<!-- START FOOTER -->
// 							<div class="footer">
// 							  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
// 								<tr>
// 								  <td class="content-block">
// 									<span class="apple-link">Regards,</span>
// 									<br><a href="https://sysonex.com/" target="_blank" style="color: #228BE6;">sysonex.com</a>
// 								  </td>
// 								</tr>
// 							  </table>
// 							</div>
				
// 							<!-- END FOOTER -->
							
// 				<!-- END CENTERED WHITE CONTAINER --></div>
// 						</td>
// 						<td>&nbsp;</td>
// 					  </tr>
// 					</table>
// 				  </body>
// 				</html>`
// 			});

// 			return { data: 'email sent' } as IServiceData;
// 		} catch (e) {
// 			console.error(e);
// 			return {
// 				businessError: {
// 					type: ServiceError.BAD_REQUEST,
// 					message: 'error while sending email'
// 				}
// 			} as IServiceData;
// 		}
// 	}

// 	async forgotPassword(receiverMail: string, content: string) {
// 		try {
// 			const userDetail = await this.prisma.party.findFirst({
// 				where: {
// 					email: receiverMail
// 				},
// 				select: {
// 					email: true,
// 					username: true
// 				}
// 			});

// 			if (!userDetail) {
// 				return { data: 'User not found!!' } as IServiceData;
// 			}

// 			await this.mailerService.sendMail({
// 				to: receiverMail,
// 				subject: 'password reset for sysrisk account',
// 				html: `<html>

// 				<head>
// 					<style>
// 						@media only screen and (max-width: 620px) {
// 							/* Add your responsive styles here */
// 						}
				
// 						@media all {
// 							/* Add your global styles here */
// 						}
				
// 						body {
// 							background-color: #f9f9f9;
// 							font-family: 'Arial', sans-serif;
// 							-webkit-font-smoothing: antialiased;
// 							font-size: 14px;
// 							line-height: 1.4;
// 							margin: 0;
// 							padding: 0;
// 							-ms-text-size-adjust: 100%;
// 							-webkit-text-size-adjust: 100%;
// 						}
				
// 						.container {
// 							max-width: 580px;
// 							margin: 0 auto;
// 						}
				
// 						.header {
// 							background-color: #3498db;
// 							padding: 20px;
// 							text-align: center;
// 						}
				
// 						.header img {
// 							max-width: 120px;
// 							height: auto;
// 						}
				
// 						.content {
// 							box-sizing: border-box;
// 							padding: 20px;
// 							background-color: #ffffff;
// 							border-radius: 3px;
// 							margin-top: 20px;
// 						}
				
// 						.instructions {
// 							margin-bottom: 15px;
// 						}
				
// 						.btn-reset {
// 							display: inline-block;
// 							background-color: #3498db;
// 							color: #ffffff;
// 							text-decoration: none;
// 							padding: 10px 15px;
// 							border-radius: 5px;
// 						}
				
// 						.footer {
// 							clear: both;
// 							margin-top: 20px;
// 							text-align: center;
// 							padding: 10px;
// 							color: #999999;
// 							font-size: 12px;
// 						}
// 					</style>
// 				</head>
				
// 				<body>
// 					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9; width: 100%;" width="100%" bgcolor="#f9f9f9">
// 						<tr>
// 							<td style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
// 							<td class="container" style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; margin: 0 auto; padding: 0 10px;" width="580" valign="top">
// 								<div class="header" style="background-color: #333787; padding: 20px; text-align: center;">
// 									<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/sysonex-logo.png" alt="logo" border="0" style="max-width: 120px; height: auto;">
// 								</div>
				
// 								<div class="content" style="box-sizing: border-box; padding: 20px; background-color: #ffffff; border-radius: 3px; margin-top: 20px;">
// 									<p style="font-family: 'Arial', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
// 									   Dear ${userDetail.username}
// 									</p>
// ${content}


// 									<br />
				
// 								</div>
				
// 								<div class="footer" style="clear: both; margin-top: 20px; text-align: center; padding: 10px; color: #999999; font-size: 12px;">
// 									Regards,<br> sysonex.net<br> support@sysonex.dev
// 								</div>
// 							</td>
// 							<td style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
// 						</tr>
// 					</table>
// 				</body>
				
// 				</html>
// 				`
// 			});

// 			return { data: 'email send' } as IServiceData;
// 		} catch (e) {
// 			console.error(e);
// 			return {
// 				businessError: {
// 					type: ServiceError.BAD_REQUEST,
// 					message: 'error while sending email'
// 				}
// 			} as IServiceData;
// 		}
// 	}

// 	async support(email, subject, message) {
// 		try {
// 			await this.mailerService.sendMail({
// 				to: 'support@sysonex.dev',
// 				subject: subject,
// 				html: `<html>

// 				<head>
// 					<style>
// 						@media only screen and (max-width: 620px) {
// 							/* Add your responsive styles here */
// 						}
				
// 						@media all {
// 							/* Add your global styles here */
// 						}
				
// 						body {
// 							background-color: #f9f9f9;
// 							font-family: 'Arial', sans-serif;
// 							-webkit-font-smoothing: antialiased;
// 							font-size: 14px;
// 							line-height: 1.4;
// 							margin: 0;
// 							padding: 0;
// 							-ms-text-size-adjust: 100%;
// 							-webkit-text-size-adjust: 100%;
// 						}
				
// 						.container {
// 							max-width: 580px;
// 							margin: 0 auto;
// 						}
				
// 						.header {
// 							background-color: #3498db;
// 							padding: 20px;
// 							text-align: center;
// 						}
				
// 						.header img {
// 							max-width: 120px;
// 							height: auto;
// 						}
				
// 						.content {
// 							box-sizing: border-box;
// 							padding: 20px;
// 							background-color: #ffffff;
// 							border-radius: 3px;
// 							margin-top: 20px;
// 						}
				
// 						.instructions {
// 							margin-bottom: 15px;
// 						}
				
// 						.btn-reset {
// 							display: inline-block;
// 							background-color: #3498db;
// 							color: #ffffff;
// 							text-decoration: none;
// 							padding: 10px 15px;
// 							border-radius: 5px;
// 						}
				
// 						.footer {
// 							clear: both;
// 							margin-top: 20px;
// 							text-align: center;
// 							padding: 10px;
// 							color: #999999;
// 							font-size: 12px;
// 						}
// 					</style>
// 				</head>
				
// 				<body>
// 					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9; width: 100%;" width="100%" bgcolor="#f9f9f9">
// 						<tr>
// 							<td style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
// 							<td class="container" style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; margin: 0 auto; padding: 0 10px;" width="580" valign="top">
// 								<div class="header" style="background-color: #333787; padding: 20px; text-align: center;">
// 									<img src="https://sysrisk-internal-files.s3.us-east-1.amazonaws.com/sysonex-logo.png" alt="logo" border="0" style="max-width: 120px; height: auto;">
// 								</div>
				
// 								<div class="content" style="box-sizing: border-box; padding: 20px; background-color: #ffffff; border-radius: 3px; margin-top: 20px;">
// 									<p style="font-family: 'Arial', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
// 									Good Day,
// 									</p>
// ${message}


// 									<br />
				
// 								</div>
				
// 								<div class="footer" style="clear: both; margin-top: 20px; text-align: center; padding: 10px; color: #999999; font-size: 12px;">
// 									Regards,<br> ${email}<br>
// 								</div>
// 							</td>
// 							<td style="font-family: 'Arial', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
// 						</tr>
// 					</table>
// 				</body>
				
// 				</html>
// 				`
// 			});

// 			return { data: 'email send' } as IServiceData;
// 		} catch (e) {
// 			console.error(e);
// 			return {
// 				businessError: {
// 					type: ServiceError.BAD_REQUEST,
// 					message: 'error while sending email'
// 				}
// 			} as IServiceData;
// 		}
// 	}
// }
