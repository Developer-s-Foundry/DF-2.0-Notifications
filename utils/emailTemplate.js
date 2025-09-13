export const projectCompletedTemplate = (projectName, projectLink) => `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2563eb; text-align: center;">Project Completed</h2>

    <p>Hello Team,</p>

    <p>The project <strong>${projectName}</strong> has been successfully completed.</p>

    <div style="text-align: center; margin: 20px 0;">
      <a href="${projectLink}" 
         style="background-color: #2563eb; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">
         View Project
      </a>
    </div>

    <p>Keep up the amazing work!</p>

    <p>Warm regards,<br/>Task Notifier System</p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      This is an automated notification. Please do not reply.<br/>
      &copy; ${new Date().getFullYear()} Task Notifier. All rights reserved.
    </p>
  </div>
`;


export const taskMovedTemplate = (taskName, fromStage, toStage) => `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #16a34a; text-align: center;">Task Update</h2>

    <p>Hello Team,</p>

    <p>The task <strong>${taskName}</strong> has been moved from <em>${fromStage}</em> ➝ <em>${toStage}</em>.</p>

    <p>Stay on track and keep up the great work!</p>

    <p>Best regards,<br/>Task Notifier System</p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      This is an automated notification. Please do not reply.<br/>
      &copy; ${new Date().getFullYear()} Task Notifier. All rights reserved.
    </p>
  </div>
`;


export const taskExpirationTemplate = (taskName, dueDate, taskLink) => `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #dc2626; text-align: center;">Task Expiration Reminder</h2>

    <p>Hello Team,</p>

    <p>The task <strong>${taskName}</strong> is due on <strong>${dueDate}</strong> and has reached its deadline.</p>

    <div style="text-align: center; margin: 20px 0;">
      <a href="${taskLink}" 
         style="background-color: #dc2626; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">
         View Task
      </a>
    </div>

    <p>Please take the necessary action as soon as possible.</p>

    <p>Best regards,<br/>Task Notifier System</p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      This is an automated notification. Please do not reply.<br/>
      &copy; ${new Date().getFullYear()} Task Notifier. All rights reserved.
    </p>
  </div>
`;
