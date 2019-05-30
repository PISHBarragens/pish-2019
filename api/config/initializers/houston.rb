case Rails.env
when 'development'
	APN = Houston::Client.development
	# APN.certificate = File.read('apple_certificates/certificate.pem')
else #production
	APN = Houston::Client.production
	# APN.certificate = File.read('apple_certificates/certificate.pem')
end
