var parser = require('xml2json'),
	request = require('request'),
	qs = require('querystring');

module.exports = function(api_user, api_key, client_ip) {

	var config = {};
		config.api_user = api_user;
		config.api_key = api_key;
		config.client_ip = client_ip;

	var baseUrl = 'https://api.namecheap.com/xml.response';

	var checkDomains = function(domains, callback) {

		var params = {};
		params.ApiUser = config.api_user;
		params.ApiKey = config.api_key;
		params.UserName = config.api_user;
		params.Command = 'namecheap.domains.check';
		params.ClientIp = config.client_ip;
		params.DomainList = domains;

		var url = baseUrl + "?" + qs.stringify(params);

		request.get({url: url}, function(error, response, body) {

			if (error) {
				callback(error);
				return false;
			}

			body = parser.toJson(body, { object: true });
			error = body.ApiResponse.Errors.Error;
			error = error ? { code : error.Number, message: error.$t } : undefined;
			if (error) {
				callback(error);
				return false;
			}

			var domains = [];
			body.ApiResponse.CommandResponse.DomainCheckResult.forEach(function(domain) {
				domains.push({
					"domain": domain.Domain,
					"available": domain.Available
				});
			});

			callback(error, domains);

			return;

		});

	};

	return {
		checkDomains: checkDomains
	};

};