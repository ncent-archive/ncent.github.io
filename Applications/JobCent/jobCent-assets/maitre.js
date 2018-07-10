<script type="text/javascript">
  window.MaitreConfig = {
      defaults: {
        form_container_id: "maitre-widget", // The ID of the div where you want the form to appear.
	sharing_screen_container_id: "maitre-sharing", // The ID of the div where you want the sharing screen. Useful only if you want the sharing screen to appear in a different part of the page. It doesn't work if the popup is enabled
        default_url: "http://maitreapp.co", // The URL that will be used to create the referral link.
        source: "Twitter", // The marketing channel the subscribers will be attributed to.
        email: "john@smith.com", // The default value of the email field.
        name: "John Smith", // The default value of the name field.
        extra_field: "USA", // The default value of the extra_field field.
	extra_field_2: "+1 123456789" // The default value of the second extra_field field.
      },
      settings: {
        test_mode: false, // Enable/disable test mode
        one_click_signup: {
          enable: true, // Turn on/off the <a href="https://support.maitreapp.co/article/138-how-to-send-one-click-registration-links-to-my-existing-email-list">one-click-signup feature</a>
          name: "maitre_name",
          email: "maitre_email", // The URL parameter used to extract the email
          extra_field: "maitre_extra_field",
          extra_field_2: "maitre_extra_field_2"
        },
	floating_button: {
          enable: true, // Whether or not to enable the <a href="https://support.maitreapp.co/article/159-how-to-use-the-floating-button">Floating Button</a>
          text: "Join our Ambassador Program",
          color: "#1781bb",
          position: "left" // Can be "left", "center" or "right"
        },
        design: {
          enable: true, // If disabled, the form will be loaded without a stylesheet
          custom_css: "",
          colors: {
            primary: "#1781bb"
          }
        },
        form: {
          cover: "https://mywebsite.com/images/cover.jpg",
          header: { text: "Sign up to win", color: "#1781bb" },
          name: { require: true, placeholder: "Your name" },
          email: { placeholder: "Your email" },
          extra_field: { require: false, placeholder: "" },
          extra_field_2: { require: false, placeholder: "" },
          submit_button: {
		text: "Submit",
		check_position: "Check status",
		submitting: "Submitting...",
		color: "#1781bb"
	  },
          status: { text: "Check status", back: "Back" },
          terms_conditions: {
	  	require: true,
		text: "I accept the terms and conditions",
		url: "https://mywebsite.com/legal/terms"
	  }
        },
        sharing: {
          popup: false,
          open_if_signed_up: true,
          header: { text: "Congratulations, you're in!", color: "#222" },
          subheader: {text: "", color: "#bbb" },
          people_referred: "People referred by you",
          instructions: "Refer your friends with the link below",
          verification: {
            text: "Don't forget to confirm your email",
            reminder_email: "Your email hasn't been verified yet.<br>Check your inbox - including the junk folder - and if you don't find it click the link below to resend it.",
            resend_email: "Resend confirmation email",
            resending_email: "Sending email...",
            email_replace: "confirm your email", // The string that will be replaced with a link to popular email providers. Try to signup with a @gmail.com email.
            email_resent: "Email has been sent. Check your inbox."
          },
          socials: {
            twitter: { show: true, message: "I just signed up on this awesome website! %referral_code%" },
            facebook: { show: true },
            facebook_messenger: { show: false },
            email: { show: true, message: "Check this out %referral_code%", subject: "" },
            whatsapp: { show: false, message: "" },
            linkedin: { show: false, message: "" },
            reddit: { show: false, message: "" },
            telegram: { show: false, message: "" },
            line: { show: false, message: "" }
          },
          leaderboard: {
            show: true,
            position: "Position",
            subscriber: "Subscriber",
            points: "Points",
            footnote: "1 referral = 1 point"
          },
          rewards: {
            header: "This is what you can win",
            list: [
		{ title: "Free Hat", description: "1st position", image: "https://mywebsite.com/images/reward.png"  },
		{ title: "Free Suite", description: "2nd position", image: "https://mywebsite.com/images/reward.png"  }
	    ],
            referrals: "Referrals",
            unlocked: "Unlocked!"
          }
        },
        alerts: {
          subscriber_not_found: "Email not found.",
          subscriber_already_promoted: "You have already been promoted.",
          form_incomplete: "Something is missing. Please fill out the form before submitting.",
          server_problem: "We are experiencing some issues on our server. Please try again.",
	  failed_recaptcha: "It looks like you're a bot.",
          terms_conditions: "You must accept the Terms & Conditions",
        }
      },
      callbacks: see Callbacks
  }
</script><br>