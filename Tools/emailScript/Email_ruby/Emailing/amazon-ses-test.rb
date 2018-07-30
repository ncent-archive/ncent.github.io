require 'aws-sdk'
require 'csv'
require 'json'
require './MaitreEarlyAccessWhitelist'
require './EduEmailList'

whitelist = MaitreEarlyAccessWhitelist::WHITELIST
angel_blitzkrieg_email_list = MaitreEarlyAccessWhitelist::ANGEL_BLITZKRIEG
reporter_list = MaitreEarlyAccessWhitelist::REPORTERS
edu_list = EduEmailList::LIST

#
# angelEmail1 = get_emails(angel_blitzkrieg_email_list[0..500])
# angelEmail2 = get_emails(angel_blitzkrieg_email_list[501..1000])
# angelEmail3 = get_emails(angel_blitzkrieg_email_list[1001..1500])
# angelEmail4 = get_emails(angel_blitzkrieg_email_list[1501..2000])
# angelEmail5 = get_emails(angel_blitzkrieg_email_list[2001..2500])
# angelEmail6 = get_emails(angel_blitzkrieg_email_list[2501..3000])
# angelEmail7 = get_emails(angel_blitzkrieg_email_list[3001..3500])
# angelEmail8 = get_emails(angel_blitzkrieg_email_list[3501..4000])
# angelEmail9 = get_emails(angel_blitzkrieg_email_list[4001..4500])
# angelEmail10 = get_emails(angel_blitzkrieg_email_list[4501..5000])
# angelEmail11 = get_emails(angel_blitzkrieg_email_list[5001..5500])
# angelEmail12 = get_emails(angel_blitzkrieg_email_list[5501..6000])
# angelEmail13 = get_emails(angel_blitzkrieg_email_list[6001..6500])
# angelEmail14 = get_emails(angel_blitzkrieg_email_list[6501..7000])
# angelEmail15 = get_emails(angel_blitzkrieg_email_list[7001..7500])
# angelEmail16 = get_emails(angel_blitzkrieg_email_list[7501..8000])
# angelEmail17 = get_emails(angel_blitzkrieg_email_list[8001..angel_blitzkrieg_email_list.length - 1])

def send_email recipient, recipName
    awsregion = "us-west-2"
    subject = "nCent: Stanford/Google/MIT PhD blockchain startup - Seed Announcement"
    htmlbody =
    # '<p>Friends,</p>'\
    # '<div>&nbsp;</div>'\
    # '<div>We\'re excited to announce our $10MM Seed round with participation from Sequoia, Steve Jurvetson, Naval Ravikant, Metastable, SV Angel, Floodgate, Signia, Zhenfund, AME Cloud Ventures, Winklevoss Capital, and more.</div>'\
    # '<div>&nbsp;</div>'\
    # '<div>We invite you to learn more about our project by&nbsp;watching my <a href="https://www.youtube.com/watch?v=KSQI9s4eJdM&amp;app=desktop" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/watch?v%3DKSQI9s4eJdM%26app%3Ddesktop&amp;source=gmail&amp;ust=1531434945648000&amp;usg=AFQjCNG3WdOjpE0ZxFNXrqozahVXNCuhUg">fireside chat</a> with legendary super-investor Steve Jurvetson... and to join nCent Nation on Twitter (<a href="https://twitter.com/kk_ncnt" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/kk_ncnt&amp;source=gmail&amp;ust=1531434945648000&amp;usg=AFQjCNHoKydh5Og4i33QjJyqzERXkl1HBQ">@kk_ncnt</a>) and Telegram (<a href="https://t.me/ncent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://t.me/ncent&amp;source=gmail&amp;ust=1531434945648000&amp;usg=AFQjCNESFwPBFjX1C1LaskYzutcKAJqlFw">t.me/ncent</a>).</div>'\
    # '<div>&nbsp;</div>'\
    # '<div>If you are interested in receiving more information, or being considered for an upcoming allocation, please fill out our&nbsp;<a href="https://docs.google.com/forms/d/e/1FAIpQLScUVVo2QPAhiaW6Trm7WtTx_nzbiSn0WcQvpBj_OdlDT_49eQ/viewform?c=0&amp;w=1" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://docs.google.com/forms/d/e/1FAIpQLScUVVo2QPAhiaW6Trm7WtTx_nzbiSn0WcQvpBj_OdlDT_49eQ/viewform?c%3D0%26w%3D1&amp;source=gmail&amp;ust=1531434945648000&amp;usg=AFQjCNHHpKjiDZ4qZVU5jJw4rBLATKbceQ"><strong>nCent investor questionnaire</strong></a>.&nbsp;</div>'\
    # '<div>&nbsp;</div>'\
    # '<div>We\'ll be in touch afterwards with details and instructions on how to participate.&nbsp; Kindly feel free to pass on to folks interested in our project to do the same.</div>'\
    # '<div>&nbsp;</div>'\
    # '<div>&nbsp;</div>'\
    # '<div>To the moon!</div>'\
    # '<div>-KKJ</div>'\
    # '<div dir="ltr"><span style="font-family: tahoma, sans-serif;">---------</span></div>'\
    # '<div dir="ltr">'\
    # '<div>'\
    # '<div>'\
    # '<div><span style="font-family: tahoma, sans-serif;">&nbsp;</span></div>'\
    # '<div><span style="font-family: tahoma, sans-serif;">Follow me on Twitter&nbsp;<a href="http://twitter.com/kk_ncnt" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://twitter.com/kk_ncnt&amp;source=gmail&amp;ust=1531498474661000&amp;usg=AFQjCNH-Uvv30B1cJCBFUgLR6LyPsVmKVQ">@kk_ncnt</a>&nbsp;and Telegram&nbsp;<a href="http://t.me/ncent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://t.me/ncent&amp;source=gmail&amp;ust=1531498474661000&amp;usg=AFQjCNGIQwDZ61O9OoV0ryxhU-uLuFzUgg">t.me/ncent</a></span></div>'\
    # '</div>'\
    # '</div>'\
    # '<div dir="ltr">&nbsp;</div>'\
    # '</div>'\
    # '<div dir="ltr"><span style="font-family: tahoma, sans-serif;">&nbsp;</span></div>'\
    # '<div>'\
    # '<div>'\
    # '<div>'\
    # '<div dir="ltr">'\
    # '<div dir="ltr">'\
    # '<div dir="ltr">'\
    # '<table border="0" width="470" cellspacing="0" cellpadding="0">'\
    # '<tbody>'\
    # '<tr>'\
    # '<td>'\
    # '<table border="0" cellspacing="0" cellpadding="0">'\
    # '<tbody>'\
    # '<tr>'\
    # '<td valign="top" width="100"><img class="CToWUd" src="https://ci4.googleusercontent.com/proxy/xdzX-qL4JQ9gH8aQlbhjU1C1ZWNBmEF2yZC9WHNmhON0BZJLrXEJXo7zL9o4eFW-O_GCCi2U_Jf27L98zKFY1qkVRoGzqL4nNc-qwHmBrNmnAHUfAL49ClwN8xMTMpneQfZ9c8mgnNykVJhwVsdtZYU=s0-d-e1-ft#https://img.mysignature.io/p/3/d/b/3db8b741-d177-51cc-bef1-e23bbac1363a.png?time=1529954527" alt="nCent Labs" width="100" /></td>'\
    # '<td valign="top">'\
    # '<table border="0" cellspacing="0" cellpadding="0">'\
    # '<tbody>'\
    # '<tr>'\
    # '<td>'\
    # '<div>KK Jain</div>'\
    # '</td>'\
    # '</tr>'\
    # '<tr>'\
    # '<td><strong>Founder &amp; Lead Developer</strong>&nbsp;<br />nCent Labs</td>'\
    # '</tr>'\
    # '<tr>'\
    # '<td>main:&nbsp;<a>(650) 503-8785<br />cell:&nbsp;</a><a>(917) 719-0915</a></td>'\
    # '</tr>'\
    # '<tr>'\
    # '<td>email:&nbsp;<a href="mailto:kk@ncnt.io" target="_blank">kk@ncnt.io</a></td>'\
    # '</tr>'\
    # '</tbody>'\
    # '</table>'\
    # '</td>'\
    # '<td valign="middle">'\
    # '<table border="0" cellspacing="0" cellpadding="0">'\
    # '<tbody>'\
    # '<tr>'\
    # '<td><a href="https://www.linkedin.com/in/kkjain1/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/in/kkjain1/&amp;source=gmail&amp;ust=1531498474662000&amp;usg=AFQjCNFq9-fnmIOigDQjDZ0La3mOi5mJFQ"><img class="CToWUd" src="https://ci6.googleusercontent.com/proxy/mPeqkQF6WQZl-YkX6iXaYYCURwLuOcw_l3l_xeWRvAt9OK21VbmOka83Hg3bYXcm7ptFoC6JALP-RiH_UBTVjM_zXlvihGGJZL0fG0lQnvSSvj8dDOqcoz81r1gFHPcR4G3sHQ=s0-d-e1-ft#https://img.mysignature.io/s/v3/a/c/a/aca6d67a-008a-5060-8f54-41a2ad28f5da.png" alt="linkedin" width="25" /></a></td>'\
    # '</tr>'\
    # '<tr>'\
    # '<td><a href="https://twitter.com/kk_ncnt" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/kk_ncnt&amp;source=gmail&amp;ust=1531498474662000&amp;usg=AFQjCNHxFXCWtSOuve8DgVcS5FzCHfWifg"><img class="CToWUd" src="https://ci6.googleusercontent.com/proxy/nIDs9bdEG1RPlFsnlY-KcdQg9_-xi8E_9S8M9B-ntNeIWamIXn86OScOMgcVZa2gKjKrpGP9GqtKhEAiSJ3_ovkRlU52w0Q8XxRdYamndcqD4SkcAzjYaRHaw-1XBftTrDhFhQ=s0-d-e1-ft#https://img.mysignature.io/s/v3/c/8/9/c897a27d-c2c0-5e72-b299-b784e320fe4d.png" alt="twitter" width="25" /></a></td>'\
    # '</tr>'\
    # '</tbody>'\
    # '</table>'\
    # '</td>'\
    # '</tr>'\
    # '</tbody>'\
    # '</table>'\
    # '</td>'\
    # '</tr>'\
    # '</tbody>'\
    # '</table>'\
    # '</div>'\
    # '</div>'\
    # '</div>'\
    # '<div dir="ltr">&nbsp;</div>'\
    # '</div>'\
    # '<div><span style="font-family: tahoma, sans-serif;">&nbsp;</span></div>'\
    # '<div><span style="font-family: tahoma, sans-serif;">&nbsp;</span></div>'\
    # '<div><span style="font-family: tahoma, sans-serif;">&nbsp;</span></div>'\
    # '<div>&nbsp;</div>'\
    # '</div>'\
    # '</div>'\
    # '<div dir="ltr">'\
    # '<div>&nbsp;</div>'\
    # '<div>This e-mail may contain information that is confidential, privileged, or otherwise protected from disclosure. If you are not the intended recipient of this e-mail, please delete it and any attachments, promptly notify the sender that you received it in error, and do not duplicate, distribute, or disclose any information herein in any manner. This communication is neither an offer to sell nor a solicitation of an offer to buy an interest in any securities described herein.</div>'\
    # '</div>'\
    // insert html file here, and add relevant information.
    // or at least provide the option to go either way.
    '<div class="">'\
    "<div id=':3lq' tabindex='-1'>Hi&nbsp;#{recipName},</div>"\
    '<div id=":3lf" class="ii gt adO">'\
    '<div id=":3le" class="a3s aXjCH ">'\
    '<div dir="ltr">'\
    '<div>'\
    '<div>&nbsp;</div>'\
    '<div>I am the Founder of nCent Labs, a Stanford/Google/MIT spinout blockchain startup. We need YOUR help to reach student founders on&nbsp;<strong>College Campuses&nbsp;</strong><em><strong>worldwide</strong></em>!</div>'\
    '<div>&nbsp;</div>'\
    '<div>We are announcing nCent nGage: Our Global Campus Founder Program!</div>'\
    '<div>&nbsp;</div>'\
    '<div>It is easy to be a Founder at your campus.&nbsp;Read about&nbsp;<strong><a href="https://medium.com/@kk_ncnt/introducing-ngage-the-ncent-labs-worldwide-campus-founders-program-f9b56b55e57b" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://medium.com/@kk_ncnt/introducing-ngage-the-ncent-labs-worldwide-campus-founders-program-f9b56b55e57b&amp;source=gmail&amp;ust=1532131677158000&amp;usg=AFQjCNFLuLgqbus_x_YEvsjBC9byINlpQQ">here</a>,&nbsp;</strong><strong><em>and</em></strong>&nbsp;</div>'\
    '<div>sign up on the nCent nGage website&nbsp;<strong><a href="https://ncent.io/Applications/founders/founders.html" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ncent.io/Applications/founders/founders.html&amp;source=gmail&amp;ust=1532131677158000&amp;usg=AFQjCNFmgw3Ia9mKSzD7pZcYXsCqhSr35Q">here</a>!</strong></div>'\
    '<div><strong>&nbsp;</strong></div>'\
    '<div><strong>Tell Your Friends!&nbsp;</strong></div>'\
    '<div><strong>&nbsp;</strong></div>'\
    '<div><strong>As always, please refer any questions you have to our global telegram&nbsp;<a href="https://t.me/ncent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://t.me/ncent&amp;source=gmail&amp;ust=1532131677158000&amp;usg=AFQjCNGpUzzO3c9-tGPwBspWyzP-iqY-7A">https://t.me/ncent</a>, or email me directly:&nbsp;<a href="mailto:kk@ncnt.io" target="_blank">kk@ncnt.io</a></strong></div>'\
    '<div><br class="m_3251626434468430425gmail-m_8885128552379682600gmail-m_-3407152640723797785gmail-m_2472857554025850470gmail-m_3647584131927102378gmail-m_-7113295887784295495gmail-Apple-interchange-newline" /><br /></div>'\
    '<div>&nbsp;</div>'\
    '<div>Warmly,</div>'\
    '<div>-KK</div>'\
    '</div>'\
    '</div>'\
    '</div>'\
    '</div>'\
    '</div>'\
    '<div class="">'\
'<div id=":3lq" tabindex="-1">'\
'<div dir="ltr"><span style="font-family: tahoma, sans-serif;">---------</span></div>'\
'<div dir="ltr">'\
'<div>'\
'<div>'\
'<div><span style="font-family: tahoma, sans-serif;">&nbsp;</span></div>'\
'<div><span style="font-family: tahoma, sans-serif;">Follow me on Twitter&nbsp;<a href="http://twitter.com/kk_ncnt" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://twitter.com/kk_ncnt&amp;source=gmail&amp;ust=1532124514749000&amp;usg=AFQjCNEouxkgn0UXXB66bwmOJI-zIEjfuw">@kk_ncnt</a>&nbsp;and Telegram&nbsp;<a href="http://t.me/ncent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://t.me/ncent&amp;source=gmail&amp;ust=1532124514749000&amp;usg=AFQjCNFreEK1AS_Cr48aeXG6B7n8FETVnw">t.me/ncent</a></span></div>'\
'</div>'\
'</div>'\
'<div dir="ltr">&nbsp;</div>'\
'</div>'\
'<div dir="ltr">&nbsp;</div>'\
'<div>'\
'<div>'\
'<div>'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<div dir="ltr">'\
'<table border="0" cellspacing="0" cellpadding="0">'\
'<tbody>'\
'<tr>'\
'<td valign="top" width="100"><img class="CToWUd" src="https://ci4.googleusercontent.com/proxy/-Np7c8DBW4grKIqFMmK8fFvUShnKYPvBtuuS4iwEHoOv9ANEFUhcmd3zMyTzDrzsoOu-EjlqC1nlMf4OtMU7f5gWpZv6MRlo94TKKSuycRDyu0txRvmsLUA4PWL8bsnpV8Bk-i6SnxD2ru4R-4InUj0=s0-d-e1-ft#https://img.mysignature.io/p/8/4/b/84b919c5-5e83-5e63-81e5-be0e72e56bcb.png?time=1531931275" alt="nCent Labs" width="100" /></td>'\
'<td valign="top">'\
'<table border="0" cellspacing="0" cellpadding="0">'\
'<tbody>'\
'<tr>'\
'<td>'\
'<div>KK Jain</div>'\
'</td>'\
'</tr>'\
'<tr>'\
'<td><strong>Founder &amp; Lead Developer</strong><br />nCent Labs</td>'\
'</tr>'\
'<tr>'\
'<td>main:&nbsp;<a>(650) 503-8785</a></td>'\
'</tr>'\
'<tr>'\
'<td>'\
'<table border="0" cellspacing="0" cellpadding="0">'\
'<tbody>'\
'<tr>'\
'<td>phone:&nbsp;<a>(917) 719-9160</a></td>'\
'</tr>'\
'</tbody>'\
'</table>'\
'</td>'\
'</tr>'\
'<tr>'\
'<td>email:&nbsp;<a href="mailto:kk@ncnt.io" target="_blank">kk@ncnt.io</a></td>'\
'</tr>'\
'</tbody>'\
'</table>'\
'</td>'\
'<td valign="middle">'\
'<table border="0" cellspacing="0" cellpadding="0">'\
'<tbody>'\
'<tr>'\
'<td><a href="https://www.linkedin.com/in/kkjain1/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/in/kkjain1/&amp;source=gmail&amp;ust=1532124514749000&amp;usg=AFQjCNEs7qGXml3Wt3c1-nsBecPFQZZP1w"><img class="CToWUd" src="https://ci6.googleusercontent.com/proxy/mPeqkQF6WQZl-YkX6iXaYYCURwLuOcw_l3l_xeWRvAt9OK21VbmOka83Hg3bYXcm7ptFoC6JALP-RiH_UBTVjM_zXlvihGGJZL0fG0lQnvSSvj8dDOqcoz81r1gFHPcR4G3sHQ=s0-d-e1-ft#https://img.mysignature.io/s/v3/a/c/a/aca6d67a-008a-5060-8f54-41a2ad28f5da.png" alt="linkedin" width="25" /></a></td>'\
'</tr>'\
'<tr>'\
'<td><a href="http://t.me/ncent" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://t.me/ncent&amp;source=gmail&amp;ust=1532124514749000&amp;usg=AFQjCNFreEK1AS_Cr48aeXG6B7n8FETVnw"><img class="CToWUd" src="https://ci4.googleusercontent.com/proxy/Yt3FMfX9QkwnL14wwvP456Q_WoS0hohNVmlNmD3QasZr8v-tAj1Yj9dyiI49UMkjfxLuLAXROOMcTSy8syE04LZMV3UxOdNW36FGacth8QdhAGZnwmF3OdSVeTJ6HQq-nXxgFQ=s0-d-e1-ft#https://img.mysignature.io/s/v3/0/3/b/03bf200d-3fd2-51f6-a75e-4e727e667d1b.png" alt="telegram" width="25" /></a></td>'\
'</tr>'\
'<tr>'\
'<td><a href="https://twitter.com/KK_ncnt" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/KK_ncnt&amp;source=gmail&amp;ust=1532124514750000&amp;usg=AFQjCNFIyPqUlmsCnadr-9BuoSDBOB-OQQ"><img class="CToWUd" src="https://ci6.googleusercontent.com/proxy/nIDs9bdEG1RPlFsnlY-KcdQg9_-xi8E_9S8M9B-ntNeIWamIXn86OScOMgcVZa2gKjKrpGP9GqtKhEAiSJ3_ovkRlU52w0Q8XxRdYamndcqD4SkcAzjYaRHaw-1XBftTrDhFhQ=s0-d-e1-ft#https://img.mysignature.io/s/v3/c/8/9/c897a27d-c2c0-5e72-b299-b784e320fe4d.png" alt="twitter" width="25" /></a><br /><br /></td>'\
'</tr>'\
'</tbody>'\
'</table>'\
'</td>'\
'</tr>'\
'</tbody>'\
'</table>'\
'</div>'\
'<div dir="ltr">'\
'<div>&nbsp;</div>'\
'</div>'\
'</div>'\
'<div dir="ltr">&nbsp;</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'</div>'\
'<div dir="ltr">'\
'<div>&nbsp;</div>'\
'<div>&nbsp;</div>'\
'<div>&nbsp;</div>'\
'<div>This e-mail may contain information that is confidential, privileged, or otherwise protected from disclosure. If you are not the intended recipient of this e-mail, please delete it and any attachments, promptly notify the sender that you received it in error, and do not duplicate, distribute, or disclose any information herein in any manner. This communication is neither an offer to sell nor a solicitation of an offer to buy an interest in any securities described herein.</div>'\
'</div>'\
'</div>'\
'</div>'\

    textbody = ""
    encoding = "UTF-8"
    ses = Aws::SES::Client.new(region: awsregion)

    begin
        # Provide the contents of the email.
        resp = ses.send_email({
            destination: {
                to_addresses: [recipient],
                cc_addresses: ["cf@ncnt.io"],
                bcc_addresses: ["af@ncnt.io", "sm@ncnt.io"]
            },
            message: {
                body: {
                    html: {
                        charset: encoding,
                        data: htmlbody,
                    },
                    text: {
                        charset: encoding,
                        data: textbody,
                    },
                },
                subject: {
                    charset: encoding,
                    data: subject,
                },
            },
            source: "KK Jain <kk@ncnt.io>",
            # Comment or remove the following line if you are not using
            # a configuration set
            # configuration_set_name: configsetname,
            })
            puts "Email sent to #{recipient}"
            # If something goes wrong, display an error message.
        rescue Aws::SES::Errors::ServiceError => error
            puts "Email not sent. Error message: #{error}"
        end
end

def get_emails account_array
    emails = []
    account_array.each do |account|
        email_entry = account[:Email]
        account_emails = email_entry.split(" ")
        account_emails.each do |email|
            emails << email.delete(";")
        end
    end

    return emails
end
def get_names account_array
    names = []
    account_array.each do |account|
        name_entry = account[:FirstName]
        name_array_with_spaces = name_entry.split(" ")
        if name_array_with_spaces.length > 1
            names.push(name_entry)
        end
    end

    return names
end

# angel_emails = get_emails(angel_blitzkrieg_email_list)
# whitelist_emails = get_emails(whitelist)
edu_emails = get_emails(edu_list)
edu_names = get_names(edu_list)
idx = 0

# while idx < angel_emails.length
#     send_email(angel_emails[idx])
#     idx += 1
#     if (idx % 14 == 0)
#         sleep(10)
#     end
# end
while idx < edu_emails.length
    send_email(edu_emails[idx], edu_names[idx])
    idx += 1
    if (idx % 14 == 0)
        sleep(5)
    end
end

# send_email("af@ncnt.io", "Adam")
