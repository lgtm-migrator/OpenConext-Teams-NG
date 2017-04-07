package teams.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class ClientResendInvitation {

    @NotNull
    private Long invitationId;

    private String message;

}
