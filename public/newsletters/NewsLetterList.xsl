<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">

	<xsl:template match="root">
		<html>
			<body>
				
				<table class="clsSSWTable" frame="void" width="100%">
					<!--<xsl:for-each select="key('newslet', year)">-->
					<xsl:for-each select="newsletters">
						<xsl:sort order="descending" select="@year"/>

						<tr>
							<th align="left" width="17%">
								<xsl:value-of select ="@year"/></th>
							<th align="left" width="83%">Description</th>
						</tr>

						<xsl:for-each select="newsletter">
							<xsl:sort order="descending" select="month"/>
							<tr>
								<td>
									<xsl:element name="a">
										<xsl:attribute name="href">
											<xsl:value-of select="url" />
										</xsl:attribute>
										<xsl:choose>
											<xsl:when test="month='01'">
												January
											</xsl:when>
											<xsl:when test="month='02'">
												February
											</xsl:when>
											<xsl:when test="month='03'">
												March
											</xsl:when>
											<xsl:when test="month='04'">
												April
											</xsl:when>
											<xsl:when test="month='05'">
												May
											</xsl:when>
											<xsl:when test="month='06'">
												June
											</xsl:when>
											<xsl:when test="month='07'">
												July
											</xsl:when>
											<xsl:when test="month='08'">
												August
											</xsl:when>
											<xsl:when test="month='09'">
												September
											</xsl:when>
											<xsl:when test="month='10'">
												October
											</xsl:when>
											<xsl:when test="month='11'">
												November
											</xsl:when>
											<xsl:when test="month='12'">
												December
											</xsl:when>
										</xsl:choose><xsl:value-of select="optionalTitle" />
									</xsl:element>
								</td>

								<td>
									<xsl:value-of select="description" />
								</td>
							</tr>
						</xsl:for-each>


					</xsl:for-each>


				</table>

			</body>
		</html>
	</xsl:template>


</xsl:stylesheet>

